const RestClient = require('../src/RestClient');
const AxiosRequestWrapperMock = require('./RequestWrapperMock');
const { RequestWrapper, AxiosRequestWrapper } = require('../src/RequestWrapper');
const axios = require('axios');

jest.mock('axios');

// REST Client Tests -----------------------------
describe('AxiosRequestWrapper', () => {
  const customerId = 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = 'VGVzdCBLZXk=';
  const restEndpoint = 'https://rest-api.telesign.com';
  const timeout = 15000;
  const userAgent = 'unit_test';
  const contentType = 'application/json';

  describe('AxiosRequestWrapper', () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return response when POST is successful', async () => {
      const customResponse = { data: 'data-value' }
      axios.post.mockImplementation((options, callback) => {
        return Promise.resolve({ status: 200, data: customResponse, headers: { field: 'header-value' }});
      });
      const options = { method: 'POST', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [response, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', { "field": "header-value" });
      expect(response).toHaveProperty('bodyStr', '{\"data\":\"data-value\"}');
      expect(bodyStr).toEqual('{\"data\":\"data-value\"}');
    });

    it('should return error when POST fails', async () => {
      const customResponse = { data: 'error-value' }
      axios.post.mockImplementation((options, callback) => {
        return Promise.reject({ response: { status: 402, data: customResponse, headers: { field: 'header-value' }}});
      });
      const options = { method: 'POST', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error.response).toHaveProperty('status', 402);
      expect(error.response).toHaveProperty('headers', { "field": "header-value" });
      expect(error.response).toHaveProperty('data', { "data": "error-value" });
      expect(bodyStr).toEqual({ "data": "error-value" });
    });

    it('should return error when PUT is successful', async () => {
      const customResponse = { data: 'data-value' }
      axios.put.mockImplementation((options, callback) => {
        return Promise.resolve({ status: 200, data: customResponse, headers: { field: 'header-value' }});
      });
      const options = { method: 'PUT', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [response, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', { "field": "header-value" });
      expect(response).toHaveProperty('bodyStr', '{\"data\":\"data-value\"}');
      expect(bodyStr).toEqual('{\"data\":\"data-value\"}');
    });

    it('should return error when PUT fails', async () => {
      const customResponse = { data: 'error-value' }
      axios.put.mockImplementation((options, callback) => {
        return Promise.reject({ response: { status: 400, data: customResponse, headers: { field: 'header-value' }}});
      });
      const options = { method: 'PUT', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error.response).toHaveProperty('status', 400);
      expect(error.response).toHaveProperty('headers', { "field": "header-value" });
      expect(error.response).toHaveProperty('data', { "data": "error-value" });
      expect(bodyStr).toEqual({ "data": "error-value" });
    });

    it('should return error when GET is successful', async () => {
      const customResponse = { data: 'data-value' }
      axios.get.mockImplementation((options, callback) => {
        return Promise.resolve({ status: 200, data: customResponse, headers: { field: 'header-value' }});
      });
      const options = { method: 'GET', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [response, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([res, bodyStr]))
      });

      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('headers', { "field": "header-value" });
      expect(response).toHaveProperty('bodyStr', '{\"data\":\"data-value\"}');
      expect(bodyStr).toEqual('{\"data\":\"data-value\"}');
    });

    it('should return error when GET fails with null response data', async () => {
      const customResponse = { data: 'error-value' }
      axios.get.mockImplementation((options, callback) => {
        return Promise.reject(null);
      });
      const options = { method: 'GET', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(bodyStr).toEqual(null);
      expect(error).toEqual(null);
    });

    it('should return error when GET fails with empty response data', async () => {
      const customResponse = { data: 'error-value' }
      axios.get.mockImplementation((options, callback) => {
        return Promise.reject({});
      });
      const options = { method: 'GET', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(bodyStr).toEqual(null);
      expect(error).toEqual({});
    });

     it('should return error when GET fails', async () => {
      const customResponse = { data: 'error-value' }
      axios.get.mockImplementation((options, callback) => {
        return Promise.reject({ response: { status: 400, data: customResponse, headers: { field: 'header-value' }}});
      });
      const options = { method: 'GET', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      const [error, bodyStr] = await new Promise((resolve) => {
        requestWrapper.request(options, (err, res, bodyStr) => resolve([err, bodyStr]))
      });

      expect(error.response).toHaveProperty('status', 400);
      expect(error.response).toHaveProperty('headers', { "field": "header-value" });
      expect(error.response).toHaveProperty('data', { "data": "error-value" });
      expect(bodyStr).toEqual({ "data": "error-value" });
    });

    it('should log error for an unsupported method', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const customResponse = { data: 'error-value' }
      axios.patch.mockImplementation((options, callback) => {
        return Promise.reject({ response: { status: 400, data: customResponse, headers: { field: 'header-value' }}});
      });
      const options = { method: 'DELETE', field: 'value' }
      const requestWrapper = new AxiosRequestWrapper();

      requestWrapper.request(options, null);

      expect(consoleSpy).toHaveBeenCalledWith('Method: DELETE not supported!');
      consoleSpy.mockRestore();
    });

    describe('AxiosRequestWrapper', () => {
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
