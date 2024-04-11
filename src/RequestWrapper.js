class RequestWrapper {
  request(options, callback) {
    throw new Error('makeRequest method must be implemented.');
  }
}

const handleResponse = (response, callback) => {
  callback(null, response, JSON.stringify(response));
};

const handleError = (error, callback) => {
  console.log('handleError', error)
  callback(error, null, error)
};

function fetchWithTimeout(url, options) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject({ code: 408, message: 'Timeout' }), options.timeout))
  ]);
}

class FetchRequestWrapper extends RequestWrapper {

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

module.exports = {
  RequestWrapper,
  FetchRequestWrapper
};
