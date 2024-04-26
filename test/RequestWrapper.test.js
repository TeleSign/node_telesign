const RestClient = require('../src/RestClient');
const { FetchRequestWrapperMock } = require('./RequestWrapperMock');
const { RequestWrapper, FetchRequestWrapper } = require('../src/RequestWrapper');
const { test, it, expect, mockFunction, runTests } = require('./TestFramework');

// RequestWrapper Client Tests -----------------------------
async function requestWrapper() {
  const customerId = 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = 'VGVzdCBLZXk=';
  const restEndpoint = 'https://rest-api.telesign.com';
  const timeout = 300;
  const userAgent = 'unit_test';
  const contentType = 'application/json';
  const headers = { field: "header-value" };
  const bodyStr = '{\"data\":\"data-value\"}';
  const errorBody = { response: "error-response" };
  const errorResponse = { status: { code: 11011, description: "Invalid value for parameter reference_id." }};
  const successBody = { data: 'data-value' };
  const successResponse = { status: 200, data: successBody, headers: headers }
  const getOptions = { method: 'GET', field: 'value' };
  const postOptions = { method: 'POST', field: 'value' };
  const putOptions = { method: 'PUT', field: 'value' };

  errorResponse.json = function() { return errorResponse; };
  successResponse.json = function() { return successResponse; };

  it('should return response when POST is successful', async () => {
      global.fetch = (url, options) => {
        return Promise.resolve({
          json: () => Promise.resolve(successResponse)
        })
      }
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
    });

    it('should return response when POST timeout', async () => {
      const originalFetch = global.fetch
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(successResponse);
          }, 500);
        });
      }
      const sut = new FetchRequestWrapper();

      const [error, resBodyStr] = await new Promise((resolve) => {
        sut.request({ ...postOptions, timeout }, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('code', 408);
      expect(error).toHaveProperty('message', 'Timeout');
      global.fetch = originalFetch;
    });

    it('should return error when POST is rejected', async () => {
      const originalFetch = global.fetch
      const sut = new FetchRequestWrapper();
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(errorResponse);
          }, 0);
        });
      }

      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      const status = error.status;
      expect(status).toHaveProperty('code', 11011);
      expect(status).toHaveProperty('description', 'Invalid value for parameter reference_id.');
      global.fetch = originalFetch;
    });

    it('should return error when POST fails', async () => {
      const originalFetch = global.fetch
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(errorResponse);
          }, 0);
        });
      }
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response.status.code).toEqual(11011);
      expect(response.status.description).toEqual('Invalid value for parameter reference_id.');
      expect(resBodyStr).toEqual(JSON.stringify(errorResponse));
      global.fetch = originalFetch;
    });

    it('should return response when PUT is successful', async () => {
      const originalFetch = global.fetch
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(successResponse);
          }, 0);
        });
      }
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(putOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
      global.fetch = originalFetch;
    });

    it('should return error when PUT is rejected', async () => {
      const originalFetch = global.fetch
      const sut = new FetchRequestWrapper();
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(errorBody);
          }, 0);
        });
      }
      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(putOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('response', 'error-response');
      global.fetch = originalFetch;
    });

    it('should return response when GET is successful', async () => {
      const originalFetch = global.fetch
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(successResponse);
          }, 0);
        });
      }
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(getOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
      global.fetch = originalFetch;
    });

    it('should return error when GET is rejected', async () => {
      const originalFetch = global.fetch
      const sut = new FetchRequestWrapper();
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(errorBody);
          }, 0);
        });
      }

      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(getOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('response', 'error-response');
      global.fetch = originalFetch;
    });

    it('should log error for an unsupported method', async () => {
      const originalConsoleError = console.error;
      console.error = mockFunction();
      const originalFetch = global.fetch
      const sut = new FetchRequestWrapper();
      global.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({ status: 400, data: errorBody, headers: headers});
          }, 0);
        });
      }

      const options = { method: 'DELETE', field: 'value' }
      const requestWrapper = new FetchRequestWrapper();

      requestWrapper.request(options, null);

      expect(console.error).toHaveBeenCalled();
      expect(console.error.mock.calls[0][0]).toBe('Method: DELETE not supported!');
      expect(console.error).toHaveBeenCalledTimes(1);
      global.fetch = originalFetch;
      console.error = originalConsoleError;
    });

    it('should throw an error when request method is called', () => {
      const requestWrapper = new RequestWrapper();

      try {
        requestWrapper.request({}, () => {});
        fail('Expected an error to be thrown, but none was thrown.');
      } catch (error) {
        expect(error.message).toBe('makeRequest method must be implemented.');
      }
    });
}

module.exports = { requestWrapper };
