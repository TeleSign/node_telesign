export class RequestWrapper {
  request(options, callback) {
    throw new Error('makeRequest method must be implemented.');
  }
}

const handleResponse = (response, callback) => {
  const res = {
    status: response.status,
    headers: response.headers,
    bodyStr: JSON.stringify(response)
  }
  callback(null, res, res.bodyStr);
};

const handleError = (error, callback) => {
  callback(error, null, error)
};

async function fetchWithTimeout(url, options) {
  /** @type {any} */
  let fetch = (typeof window !== 'undefined' ? window : global).fetch || null;
  if (!fetch) {
    fetch = await import('node-fetch').then(m => m.default ?? m);
  }
  return await Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject({ code: 408, message: 'Timeout' }), options.timeout))
  ]);
}

export class FetchRequestWrapper extends RequestWrapper {

  request(options, callback) {
    switch (options.method) {
    case 'POST':
      fetchWithTimeout(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body,
        timeout: options.timeout
      })
        .then(response => response.json())
        .then(data => handleResponse(data, callback))
        .catch(error => handleError(error, callback));
      break;
    case 'PUT':
      fetchWithTimeout(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body,
        timeout: options.timeout
      })
        .then(response => response.json())
        .then(data => handleResponse(data, callback))
        .catch(error => handleError(error, callback));
      break;
    case 'GET':
      fetchWithTimeout(options.url, {
        method: options.method,
        headers: options.headers,
        timeout: options.timeout
      })
        .then(response => response.json())
        .then(data => handleResponse(data, callback))
        .catch(error => handleError(error, callback));
      break;
    default:
      console.error('Method: ' + options.method + ' not supported!');
    }
  }
}
