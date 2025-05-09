function __transformExtension(filepath, extMapping) {
  if (!filepath.startsWith('./') && !filepath.startsWith('../')) {
    // Package import
    return filepath;
  }
  var idx = filepath.lastIndexOf('.');
  if (idx === -1 || filepath.includes('/', idx)) {
    // No extension
    var newExt = extMapping[''];
    if (newExt) {
      return filepath + newExt;
    }
    return filepath;
  }
  for (var [origExt, _newExt] of Object.entries(extMapping).sort((a, b) => b[0].length - a[0].length)) {
    if (filepath.endsWith(origExt)) {
      return filepath.slice(0, -origExt.length) + _newExt;
    }
  }
  return filepath;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
export class RequestWrapper {
  request(options, callback) {
    throw new Error('makeRequest method must be implemented.');
  }
}
var handleResponse = (response, callback) => {
  var res = {
    status: response.status,
    headers: response.headers,
    bodyStr: JSON.stringify(response)
  };
  callback(null, res, res.bodyStr);
};
var handleError = (error, callback) => {
  callback(error, null, error);
};
function fetchWithTimeout(_x, _x2) {
  return _fetchWithTimeout.apply(this, arguments);
}
function _fetchWithTimeout() {
  _fetchWithTimeout = _asyncToGenerator(function* (url, options) {
    /** @type {any} */
    var fetch = (typeof window !== 'undefined' ? window : global).fetch || null;
    if (!fetch) {
      fetch = yield import(__transformExtension('node-fetch', {
        ".mjs": ""
      })).then(m => {
        var _m$default;
        return (_m$default = m.default) !== null && _m$default !== void 0 ? _m$default : m;
      });
    }
    return yield Promise.race([fetch(url, options), new Promise((_, reject) => setTimeout(() => reject({
      code: 408,
      message: 'Timeout'
    }), options.timeout))]);
  });
  return _fetchWithTimeout.apply(this, arguments);
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
        }).then(response => response.json()).then(data => handleResponse(data, callback)).catch(error => handleError(error, callback));
        break;
      case 'PUT':
        fetchWithTimeout(options.url, {
          method: options.method,
          headers: options.headers,
          body: options.body,
          timeout: options.timeout
        }).then(response => response.json()).then(data => handleResponse(data, callback)).catch(error => handleError(error, callback));
        break;
      case 'GET':
        fetchWithTimeout(options.url, {
          method: options.method,
          headers: options.headers,
          timeout: options.timeout
        }).then(response => response.json()).then(data => handleResponse(data, callback)).catch(error => handleError(error, callback));
        break;
      default:
        console.error('Method: ' + options.method + ' not supported!');
    }
  }
}