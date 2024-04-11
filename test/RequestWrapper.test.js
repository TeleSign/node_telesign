const RestClient = require('../src/RestClient');
const FetchRequestWrapperMock = require('./RequestWrapperMock');
const { RequestWrapper, FetchRequestWrapper } = require('../src/RequestWrapper');

// REST Client Tests -----------------------------
describe('FetchRequestWrapper', () => {
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

  describe('FetchRequestWrapper', () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return response when POST is successful', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successResponse)
        })
      );
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
    });

    it('should return response when POST timeout', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => new Promise((resolve, reject) => {
            setTimeout(() => resolve(successResponse), 500);
          })
        })
      );
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request({ ...postOptions, timeout }, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toBe(successResponse);
    });

    it('should return error when POST is rejected', async () => {
      global.fetch.mockRejectedValue({
        status: 401,
        json: errorBody
      });
      const sut = new FetchRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('status', 401);
      expect(error).toHaveProperty('json', errorBody);
    });

    it('should return error when POST fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(errorResponse)
        })
      );
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(postOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response.status.code).toEqual(11011);
      expect(response.status.description).toEqual('Invalid value for parameter reference_id.');
      expect(resBodyStr).toEqual(JSON.stringify(errorResponse));
    });

    it('should return response when PUT is successful', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successResponse)
        })
      );
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(putOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
    });

    it('should return error when PUT is rejected', async () => {
      global.fetch.mockRejectedValue({
        status: 401,
        json: errorBody
      });
      const sut = new FetchRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(putOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('status', 401);
      expect(error).toHaveProperty('json', errorBody);
    });

    it('should return response when GET is successful', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(successResponse)
        })
      );
      const sut = new FetchRequestWrapper();

      const [response, resBodyStr] = await new Promise((resolve) => {
        sut.request(getOptions, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', headers);
      expect(resBodyStr).toEqual(JSON.stringify(successResponse));
    });

    it('should return error when GET is rejected', async () => {
      global.fetch.mockRejectedValue({
        status: 401,
        json: errorBody
      });
      const sut = new FetchRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        sut.request(getOptions, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error).toHaveProperty('status', 401);
      expect(error).toHaveProperty('json', errorBody);
    });

    it('should log error for an unsupported method', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      global.fetch.mockImplementation((options, callback) => {
        return Promise.reject({ response: { status: 400, data: errorBody, headers: headers}});
      });
      const options = { method: 'DELETE', field: 'value' }
      const requestWrapper = new FetchRequestWrapper();

      requestWrapper.request(options, null);

      expect(consoleSpy).toHaveBeenCalledWith('Method: DELETE not supported!');
      consoleSpy.mockRestore();
    });

    describe('FetchRequestWrapper', () => {
      it('should throw an error when request method is called', () => {
        const requestWrapper = new RequestWrapper();

        try {
          requestWrapper.request({}, () => {});
          fail('Expected an error to be thrown, but none was thrown.');
        } catch (error) {
          expect(error.message).toBe('makeRequest method must be implemented.');
        }
      });
    });
  });
});
