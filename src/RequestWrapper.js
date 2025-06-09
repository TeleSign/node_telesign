class RequestWrapper {
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

function fetchWithTimeout(fetch, url, options) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject({ code: 408, message: 'Timeout' }), options.timeout))
  ]);
}

class FetchRequestWrapper extends RequestWrapper {

  constructor(fetch) {
    super();
    this.fetch = fetch || require('node-fetch');
  }

  request(options, callback) {
    switch (options.method) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
      fetchWithTimeout(this.fetch, options.url, {
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
      fetchWithTimeout(this.fetch, options.url, {
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

module.exports = {
  RequestWrapper,
  FetchRequestWrapper
};
