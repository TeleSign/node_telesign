const axios = require('axios');

class RequestWrapper {
  request(options, callback) {
    throw new Error('makeRequest method must be implemented.');
  }
}

const handleSuccess = (response, callback) => {
  const res = {
    status: response.status,
    headers: response.headers,
    bodyStr: JSON.stringify(response.data)
  }
  callback(null, res, res.bodyStr)
};

const handleFailure = (error, callback) => {
  var body = null
  try {
    body = error.response.data;
  } catch (error) {
    body = null;
  }
  callback(error, null, body)
};

class AxiosRequestWrapper extends RequestWrapper {

  request(options, callback) {
    axios.interceptors.request.use(function (config) {
      console.log('INTERCEPT NEW AXIOS -> ' + JSON.stringify(config, null, 2))
      return config; // TODO: remove for prod
    });

    switch (options.method) {
    case 'POST':
      axios.post(options.url, options.body, {
        headers: options.headers
      })
      .then(response => handleSuccess(response, callback))
      .catch(error => handleFailure(error, callback));
      break;
    case 'PUT':
      axios.put(options.url, options.body, {
        headers: options.headers
      })
      .then(response => handleSuccess(response, callback))
      .catch(error => handleFailure(error, callback));
      break;
    case 'GET':
      axios.get(options.url, {
        headers: options.headers
      })
      .then(response => handleSuccess(response, callback))
      .catch(error => handleFailure(error, callback));
      break;
    default:
      console.error('Method: ' + options.method + ' not supported!');
    }
  }
}

module.exports = {
  RequestWrapper,
  AxiosRequestWrapper
};
