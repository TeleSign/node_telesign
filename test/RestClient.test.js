const RestClient = require('../src/RestClient');
const Constants = require('../src/Constants');
const querystring = require('querystring');
const AxiosRequestWrapperMock = require('./RequestWrapperMock');
const { v4: uuidV4Js, validate: uuidValidate, version: uuidVersion } = require('uuid');
const os = require('os');
const TeleSignSDK = require('../src/TeleSign');
const MessagingClient = require('../src/MessagingClient.js');
const AppVerifyClient = require('../src/AppVerifyClient.js');
const IntelligenceClient = require('../src/IntelligenceClient.js');
const VoiceClient = require('../src/VoiceClient.js');
const PhoneIDClient = require('../src/PhoneIDClient.js');
const ScoreClient = require('../src/ScoreClient.js');


// REST Client Tests -----------------------------
describe('RestClient', () => {
  const customerId = 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = 'VGVzdCBLZXk=';
  const restEndpoint = 'https://rest-api.telesign.com';
  const timeout = 15000;
  const userAgent = 'unit_test';
  const contentType = 'application/json';

  const teleSignSDK = () => new TeleSignSDK(
    customerId,
    apiKey,
    restEndpoint,
    timeout,
    userAgent
  );

  const requestWrapper = new AxiosRequestWrapperMock({ statusCode: 200, body: 'Custom response' });

  describe('constructor', () => {
    it('should set default values if optional parameters are not provided', () => {
      const telesign = new RestClient(requestWrapper, customerId, apiKey);

      expect(telesign.restEndpoint).toBe('https://rest-api.telesign.com');
      expect(telesign.timeout).toBe(15000);
      expect(telesign.contentType).toBe('application/x-www-form-urlencoded');
    });

    it('should set restEndpoint default value if optional parameter is null', () => {
      const telesign = new RestClient(requestWrapper, customerId, apiKey, null);

      expect(telesign.restEndpoint).toBe('https://rest-api.telesign.com');
    });

    it('should set user agent based on OS information', () => {
      const telesign = new RestClient(requestWrapper, customerId, apiKey);

      expect(telesign.userAgent).toContain('TeleSignSDK/ECMAScript-Node v');
    });

    it('should set customerId, apiKey correctly', () => {
      const rc = new RestClient(requestWrapper, customerId, apiKey);

      expect(rc.customerId).toBe(customerId);
      expect(rc.apiKey).toBe(apiKey);
    });

    it('should set userAgent to UNKNOWN', () => {
      const osArchMock = jest.spyOn(os, 'arch').mockImplementation(() => {
        throw new Error('Mocked error from os.arch');
      });
      const rc = new RestClient(requestWrapper, customerId, apiKey);

      expect(rc.userAgent).toBe('TeleSignSDK/ECMAScript-Node v-UNKNOWN');
      osArchMock.mockRestore();
    });
  });

  describe('generateTeleSignHeaders', () => {
    it('should generate headers for HMAC authentication', () => {
      const customerId = 'yourCustomerId';
      const apiKey = 'yourApiKey';
      const method = 'POST';
      const resource = '/v1/resource';
      const contentType = 'application/json';
      const encodedFields = '{"key":"value"}';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const userAgent = 'unit_test';
      const expectedHeaders = {
        Authorization: 'TSA yourCustomerId:q5n15bclH8MY7OmbZnuVxwb9uivpmafJAlLcFnN/U8A=',
        'Content-Type': 'application/json',
        Date: 'Wed, 14 Dec 2016 18:20:12 GMT',
        'User-Agent': 'unit_test',
        'x-ts-auth-method': 'HMAC-SHA256',
        'x-ts-nonce': 'A1592C6F-E384-4CDB-BC42-C3AB970369E9',
      };
      
      const actualHeaders = RestClient.generateTeleSignHeaders(
        customerId,
        apiKey,
        method,
        resource,
        contentType,
        encodedFields,
        date,
        nonce,
        userAgent,
        Constants.AuthMethodNames.HMAC_SHA256
      );

      expect(actualHeaders).toEqual(expectedHeaders);
    });

    it('should generate headers for Basic authentication', () => {
      const customerId = 'yourCustomerId';
      const apiKey = 'yourApiKey';
      const method = 'POST';
      const resource = '/v1/resource';
      const contentType = 'application/json';
      const encodedFields = '{"key":"value"}';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const userAgent = 'unit_test';
      const expectedHeaders = {
        Authorization: 'Basic eW91ckN1c3RvbWVySWQ6eW91ckFwaUtleQ==', // This is an example, replace with actual expected value
        'Content-Type': 'application/json',
        Date: 'Wed, 14 Dec 2016 18:20:12 GMT',
        'User-Agent': 'unit_test',
        'x-ts-auth-method': 'Basic',
        'x-ts-nonce': 'A1592C6F-E384-4CDB-BC42-C3AB970369E9',
      };

      const actualHeaders = RestClient.generateTeleSignHeaders(
        customerId,
        apiKey,
        method,
        resource,
        contentType,
        encodedFields,
        date,
        nonce,
        userAgent,
        Constants.AuthMethodNames.BASIC
      );

      expect(actualHeaders).toEqual(expectedHeaders);
    });

    it('should generate headers with random UUID', () => {
      function isValidUUID(uuid) {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
      }
      const customerId = 'yourCustomerId';
      const apiKey = 'yourApiKey';
      const method = 'POST';
      const resource = '/v1/resource';
      const contentType = 'application/json';
      const encodedFields = '{"key":"value"}';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const userAgent = 'unit_test';

      const headers = RestClient.generateTeleSignHeaders(
        customerId,
        apiKey,
        method,
        resource,
        contentType,
        encodedFields
      );
      const uuid = headers['x-ts-nonce']

      expect(isValidUUID(uuid)).toBe(true);
    });

    test('Test generate Telesign headers with POST', () => {
      const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
      const apiKey = 'VGVzdCBLZXk=';
      const method = 'POST';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const resource = '/v1/resource';
      const bodyParamsURLEncoded = 'test=param';
      const contentType = "application/x-www-form-urlencoded";
      const expectedAuthorizationHeader =
          'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:vXw/XzywdhgfEG2/zWLaFp7oXmjLB8iJDMndvDbZMjk=';

      const actualHeaders = RestClient.generateTeleSignHeaders(
          customerId,
          apiKey,
          method,
          resource,
          contentType,
          bodyParamsURLEncoded,
          date,
          nonce,
          'unit_test');

      expect(actualHeaders['Authorization']).toBe(expectedAuthorizationHeader);
    });

    test('Test generate Telesign headers with Basic Authentication', () => {
      const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
      const apiKey = 'VGVzdCBLZXk=';
      const method = 'POST';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const resource = '/v1/resource';
      const bodyParamsURLEncoded = 'test=param';
      const contentType = "application/json";
      const expectedAuthorizationHeader =
          'Basic RkZGRkZGRkYtRUVFRS1ERERELTEyMzQtQUIxMjM0NTY3ODkwOlZHVnpkQ0JMWlhrPQ==';

      const actualHeaders = RestClient.generateTeleSignHeaders(
          customerId,
          apiKey,
          method,
          resource,
          contentType,
          bodyParamsURLEncoded,
          date,
          nonce,
          'unit_test',
          Constants.AuthMethodNames.BASIC);

      expect(actualHeaders['Authorization']).toBe(expectedAuthorizationHeader);
    });

    test('Test generate telesign headers unicode content', () => {
      const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
      const apiKey = 'VGVzdCBLZXk=';
      const method = 'POST';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const resource = '/v1/resource';
      const bodyParamsURLEncoded = 'test=%CF%BF';
      const contentType = "application/x-www-form-urlencoded";
      const expectedAuthorizationHeader =
          'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:lPpGXw4jTRdaEp2obzYAD5rR+2aWDInJ8ThLbq0nTGU=';

      const actualHeaders = RestClient.generateTeleSignHeaders(
          customerId,
          apiKey,
          method,
          resource,
          contentType,
          bodyParamsURLEncoded,
          date,
          nonce,
          'unit_test');

      expect(actualHeaders['Authorization']).toBe(expectedAuthorizationHeader);
    });

    test('Test generate telesign headers with GET', () => {
      const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
      const apiKey = 'VGVzdCBLZXk=';
      const method = 'GET';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const resource = '/v1/resource';
      const contentType = "application/x-www-form-urlencoded";
      expectedAuthorizationHeader =
          'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:wscyrZZtA7kdXu0i4D5KXyDmBcwH52JF1feiEKp+ir0=';

      const actualHeaders = RestClient.generateTeleSignHeaders(
          customerId,
          apiKey,
          method,
          resource,
          contentType,
          '',
          date,
          nonce,
          'unit_test');

      expect(actualHeaders['Authorization']).toBe(expectedAuthorizationHeader);
    });

    test('Test generate telesign headers default date and nonce', () => {
      function uuidValidateV4(uuid) {
        return uuidValidate(uuid) && uuidVersion(uuid) === 4;
      }
      const methodName = 'GET';
      const resource = '/v1/resource';
      const contentType = ''
      const encodedFields = ''

      const actualHeaders = RestClient.generateTeleSignHeaders(
          customerId,
          apiKey,
          methodName,
          resource,
          contentType,
          encodedFields,
          null,
          null,
          '9999999');
      const uuid = uuidValidate(actualHeaders['x-ts-nonce'])

      expect(uuid).toBeTruthy();
    });
  });

  describe('execute', () => {
    it('should make a successful GET request', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const resource = '/test';

      const actualResponse = await new Promise((resolve) => {
        telesign.execute((err, res) => resolve(res), 'GET', resource);
      });

      expect(actualResponse).toEqual(expectedResponse);
    });

    it('should make a successful GET request with a valid Date header field', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const resource = '/test';
      const originalToUTCString = Date.prototype.toUTCString;
      Date.prototype.toUTCString = jest.fn();

      const actualResponse = await new Promise((resolve) => {
        telesign.execute((err, res) => resolve(res), 'GET', resource);
      });

      expect(Date.prototype.toUTCString).toHaveBeenCalledTimes(1);
      Date.prototype.toUTCString = originalToUTCString;
    });

    it('should make a successful GET request with custom params', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const resource = '/test';
      const params = { key1: 'value1', key2: 'value2' }
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';

      const actualResponse = await new Promise((resolve) => {
        telesign.execute((err, res) => resolve(res), 'GET', resource, params, null, nonce, date);
      });

      expect(actualOptions.headers).toHaveProperty('Authorization', 'TSA customerId:y7PFf4BjQViy9TfeUTQutsQzKm/6T7NrklwOfaOTRKc=');
      expect(actualOptions.headers).toHaveProperty('Content-Type', '');
      expect(actualOptions.headers).toHaveProperty('Date', 'Wed, 14 Dec 2016 18:20:12 GMT');
      expect(actualOptions.headers).toHaveProperty('User-Agent', expect.stringContaining('TeleSignSDK/ECMAScript-Node v 2.2.3'))
      expect(actualOptions.headers).toHaveProperty('x-ts-auth-method', 'HMAC-SHA256');
      expect(actualOptions.headers).toHaveProperty('x-ts-auth-method', 'HMAC-SHA256')
      expect(actualOptions.headers).toHaveProperty('x-ts-nonce', 'A1592C6F-E384-4CDB-BC42-C3AB970369E9')
      expect(actualOptions).toHaveProperty('method', 'GET');
      expect(actualOptions).toHaveProperty('timeout', 15000);
      expect(actualOptions).toHaveProperty('url', 'https://rest-api.telesign.com/test?key1=value1&key2=value2');
      expect(actualResponse).toEqual(expectedResponse);
    });

    it('should make a successful GET request with custom params when callback is null', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const resource = '/test';
      const params = { key1: 'value1', key2: 'value2' }
      const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
      const date = 'Wed, 14 Dec 2016 18:20:12 GMT';

      telesign.execute(null, 'GET', resource, params, null, nonce, date);
    });

    it('should handle errors during the request', async () => {
      const expectedError = new Error('Request error');
      const responseBody = { message: 'Mocked Error response' }
      const requestWrapper = new AxiosRequestWrapperMock(null, expectedError, responseBody);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const methodName = 'GET';
      const resource = '/example/resource';
      const originalToUTCString = Date.prototype.toUTCString;
      Date.prototype.toUTCString = jest.fn();

      const actualError = await new Promise((resolve) => {
        telesign.execute(
          (err, body) => resolve(err),
          methodName,
          resource
        );
      });

      expect(Date.prototype.toUTCString).toHaveBeenCalledTimes(1);
      expect(actualError).toEqual(expectedError);
      Date.prototype.toUTCString = originalToUTCString;
    });

    it('should handle errors during the request when callback is null', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const expectedError = new Error('Request error');
      const responseBody = { message: 'Mocked Error response' }
      const requestWrapper = new AxiosRequestWrapperMock(null, expectedError, responseBody);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const methodName = 'GET';
      const resource = '/example/resource';
      const date = 'Wed, 15 Dec 2016 18:20:12 GMT';

      telesign.execute(
          null,
          methodName,
          resource,
          null,
          null,
          null,
          date
      );

      expect(consoleSpy).toHaveBeenCalledWith('FATAL ERROR: Wed, 15 Dec 2016 18:20:12 GMT Problems contacting Telesign Servers. Check your internet connection.');
      consoleSpy.mockRestore();
    });

    it('should handle POST requests with url-encoded body', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const jsonParams = { key1: 'value1', key2: 'value2' };
      const nonce = 'FD7E3E50-6F1A-4BAF-9A5C-2F11B9A5B654';
      const date = 'Wed, 15 Dec 2016 18:20:12 GMT';

      const postResponseJson = await new Promise((resolve) => {
        telesign.execute(
          (err, res) => resolve(res),
          'POST',
          '/v1/resource',
          jsonParams,
          Constants.AuthMethodNames.HMAC_SHA256,
          nonce,
          date
        );
      });

      expect(actualOptions.headers).toHaveProperty('Authorization', 'TSA customerId:aQk5d8nanixOKIzrQfzIWjEqvVDxEuMOCoSoiH7Cnsc=');
      expect(actualOptions.headers).toHaveProperty('Content-Type', 'application/x-www-form-urlencoded');
      expect(actualOptions.headers).toHaveProperty('Date', 'Wed, 15 Dec 2016 18:20:12 GMT');
      expect(actualOptions.headers).toHaveProperty('User-Agent', expect.stringContaining('TeleSignSDK/ECMAScript-Node v 2.2.3'))
      expect(actualOptions.headers).toHaveProperty('x-ts-auth-method', 'HMAC-SHA256')
      expect(actualOptions.headers).toHaveProperty('x-ts-nonce', 'FD7E3E50-6F1A-4BAF-9A5C-2F11B9A5B654')
      expect(actualOptions).toHaveProperty('method', 'POST');
      expect(actualOptions).toHaveProperty('timeout', 15000);
      expect(actualOptions).toHaveProperty('url', 'https://rest-api.telesign.com/v1/resource');
      expect(postResponseJson).toEqual(expectedResponse);
    });

    it('should handle PUT requests with JSON body', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const telesign = new RestClient(requestWrapper, 'customerId', 'apiKey');
      const jsonParams = { key1: 'value1', key2: 'value2' };
      const nonce = 'FD7E3E50-6F1A-4BAF-9A5C-2F11B9A5B654';
      const date = 'Wed, 15 Dec 2016 18:20:12 GMT';

      const putResponseJson = await new Promise((resolve) => {
        telesign.execute(
          (err, res) => resolve(res),
          'PUT',
          '/v1/resource',
          jsonParams,
          Constants.AuthMethodNames.HMAC_SHA256,
          nonce,
          date
        );
      });

      expect(actualOptions.headers).toHaveProperty('Authorization', 'TSA customerId:5/gV/TLGSxrKPCUsuAwBpu5ZFm/xNAQpPuMe+Jvtt1k=');
      expect(actualOptions.headers).toHaveProperty('Content-Type', 'application/x-www-form-urlencoded');
      expect(actualOptions.headers).toHaveProperty('Date', 'Wed, 15 Dec 2016 18:20:12 GMT');
      expect(actualOptions.headers).toHaveProperty('User-Agent', expect.stringContaining('TeleSignSDK/ECMAScript-Node v 2.2.3'))
      expect(actualOptions.headers).toHaveProperty('x-ts-auth-method', 'HMAC-SHA256')
      expect(actualOptions.headers).toHaveProperty('x-ts-nonce', 'FD7E3E50-6F1A-4BAF-9A5C-2F11B9A5B654')
      expect(actualOptions).toHaveProperty('method', 'PUT');
      expect(actualOptions).toHaveProperty('timeout', 15000);
      expect(actualOptions).toHaveProperty('url', 'https://rest-api.telesign.com/v1/resource');
      expect(actualOptions).toHaveProperty('body', 'key1=value1&key2=value2');
      expect(putResponseJson).toEqual(expectedResponse);
    });

    it('should handle PUT requests with JSON body for application/json content-type', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const contentType = 'application/json'
      const telesign = new RestClient(
        requestWrapper,
        'customerId',
        'apiKey',
        'https://rest-api.telesign.com',
        15000,
        null,
        contentType
      );
      const jsonParams = { key: 'value' };

      const putResponseJson = await new Promise((resolve) => {
        telesign.execute(
          (err, res) => resolve(res),
          'PUT',
          '/v1/resource',
          jsonParams,
          Constants.AuthMethodNames.HMAC_SHA256
        );
      });

      expect(putResponseJson).toEqual(expectedResponse);
      expect(actualOptions).toHaveProperty('body', '{\"key\":\"value\"}');
    });

    it('should handle PUT requests with null params', async () => {
      const response = { statusCode: 200 }
      const expectedResponse = { message: 'Successful response' }
      var actualOptions = null
      const requestWrapper = new AxiosRequestWrapperMock(response, null, expectedResponse, (options) => actualOptions = options);
      const telesign = new RestClient(
        requestWrapper,
        'customerId',
        'apiKey',
        'https://rest-api.telesign.com',
        15000,
        null,
        'application/json'
      );
      const params = null

      const putResponseJson = await new Promise((resolve) => {
        telesign.execute(
          (err, res) => resolve(res),
          'PUT',
          '/v1/resource',
          params,
          Constants.AuthMethodNames.HMAC_SHA256
        );
      });

      expect(putResponseJson).toEqual(expectedResponse);
      expect(actualOptions).toHaveProperty('body', '{}');
    });
  });

  test('Execute with requestProxy', () => {
    const telesign = teleSignSDK();
    let callback = jest.fn();
    telesign.rest.execute = jest.fn();

    telesign.rest.execute(callback, "GET", "/resource/test");
    telesign.rest.execute(callback, "POST", "/resource/test", params = { 'mdr': 'beautiful' });
  });

  // Product tests -------------------------

  test('Test Telesign constructor with default arguments', () => {
    const telesign = new TeleSignSDK(
      customerId,
      apiKey
    );

    expect(telesign.phoneid.restEndpoint).toBe("https://rest-api.telesign.com");
    expect(telesign.phoneid.timeout).toBe(15000);
    expect(telesign.phoneid.userAgent).toContain('TeleSignSDK/ECMAScript-Node v');
  });

  // AppVerify test ------------------------
  test('Test Telesign AppVerifyClient', () => {
    const telesign = teleSignSDK();
    const xid = 'abcd1234';
    let callback = jest.fn();
    telesign.appverify.execute = jest.fn();

    telesign.appverify.status(callback, xid);

    expect(telesign.appverify.execute).toHaveBeenCalledTimes(1);
  });

  test('Test AppVerifyClient', () => {
    const appVerifyClient = new AppVerifyClient(requestWrapper, customerId, apiKey);
    const xid = 'abcd1234';

    let callback = jest.fn();
    appVerifyClient.execute = jest.fn();

    appVerifyClient.status(callback, xid);

    expect(appVerifyClient.execute).toHaveBeenCalledTimes(1);
  });

  // SMS test ------------------------
  test('Test Telesign SMSClient', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "phone-number";
    const message = "Test message notification";
    const messageType = "ARN";

    let callback = jest.fn();
    telesign.sms.execute = jest.fn();

    telesign.sms.message(callback, phoneNumber, message, messageType);

    expect(telesign.sms.execute).toHaveBeenCalledWith(callback, "POST", "/v1/messaging", {"message": "Test message notification", "message_type": "ARN", "phone_number": "phone-number"});
    expect(telesign.sms.execute).toHaveBeenCalledTimes(1);
  });

  test('Test SMSClient', () => {
    const messagingClient = new MessagingClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "phone-number";
    const message = "Test message notification";
    const messageType = "ARN";

    let callback = jest.fn();
    messagingClient.execute = jest.fn();

    messagingClient.message(callback, phoneNumber, message, messageType);

    expect(messagingClient.execute).toHaveBeenCalledWith(callback, "POST", "/v1/messaging", {"message": "Test message notification", "message_type": "ARN", "phone_number": "phone-number"});
    expect(messagingClient.execute).toHaveBeenCalledTimes(1);
  });

  test('Test SMS status', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "phone-number";
    const refID = "Reference-ID";
    let callback = jest.fn();
    telesign.sms.execute = jest.fn();

    telesign.sms.status(callback, refID);

    expect(telesign.sms.execute).toHaveBeenCalledWith(callback, "GET", "/v1/messaging/Reference-ID", null);
    expect(telesign.sms.execute).toHaveBeenCalledTimes(1);
  });

  // Intelligence test ------------------
  test('Test Telesign IntelligenceClient', () => {
    const telesign = teleSignSDK();
    const requestBody = {};
    let callback = jest.fn();
    telesign.intelligence.execute = jest.fn();

    telesign.intelligence.intelligence(callback, requestBody);

    expect(telesign.intelligence.execute).toHaveBeenCalledWith(callback, "POST", "/intelligence", {}, Constants.AuthMethodNames.BASIC);
    expect(telesign.intelligence.execute).toHaveBeenCalledTimes(1);
  });

  test('Test IntelligenceClient', () => {
    const intelligenceClient = new IntelligenceClient(requestWrapper, customerId, apiKey);
    const requestBody = {};
    let callback = jest.fn();
    intelligenceClient.execute = jest.fn();

    intelligenceClient.intelligence(callback, requestBody);

    expect(intelligenceClient.execute).toHaveBeenCalledWith(callback, "POST", "/intelligence", {}, Constants.AuthMethodNames.BASIC);
    expect(intelligenceClient.execute).toHaveBeenCalledTimes(1);
  });

  // Voice test ------------------
  test('Test Telesign VoiceClient', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "phone-number";
    const message = "How are you doing good sir?";
    const messageType = 'MSG';
    const voice = 'en-BR';
    const callbackURL = 'https://www.test.com/callback';
    const accountLifecycleEvent = 'create';
    const originatingIP = '1.2.3.4';
    let callback = jest.fn();
    telesign.voice.execute = jest.fn();
    const expectedParams = {
      account_lifecycle_event: "create",
      callbackURL: "https://www.test.com/callback",
      message: "How are you doing good sir?",
      message_type: "MSG",
      originating_ip: "1.2.3.4",
      phone_number: "phone-number",
      voice: "en-BR",
    }

    telesign.voice.call(callback,
      phoneNumber,
      message,
      messageType,
      voice,
      callbackURL,
      accountLifecycleEvent,
      originatingIP
    );

    expect(telesign.voice.execute).toHaveBeenCalledWith(callback, "POST", "/v1/voice", expectedParams);
    expect(telesign.voice.execute).toHaveBeenCalledTimes(1);
  });

  test('Test VoiceClient', () => {
    const voiceClient = new VoiceClient(requestWrapper, customerId, apiKey);
    const requestBody = "1-123-123-1234";
    let callback = jest.fn();
    voiceClient.execute = jest.fn();
    const expectedParams = {
      phone_number: "1-123-123-1234",
      message: undefined,
      message_type: undefined,
    }

    voiceClient.call(callback, requestBody);

    expect(voiceClient.execute).toHaveBeenCalledWith(callback, "POST", "/v1/voice", expectedParams);
    expect(voiceClient.execute).toHaveBeenCalledTimes(1);
  });

  test('Test Voice status', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "phone-number";
    const refID = "Reference-ID";
    let callback = jest.fn();
    telesign.voice.execute = jest.fn();

    telesign.voice.status(callback, refID);

    expect(telesign.voice.execute).toHaveBeenCalledWith(callback, "GET", "/v1/voice/Reference-ID");
    expect(telesign.voice.execute).toHaveBeenCalledTimes(1);
  });

  // PhoneID test ------------------
  test('Test Telesign PhoneIDClient', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "1-123-123-1234";
    let callback = jest.fn();
    telesign.phoneid.execute = jest.fn();
    const expectedParams = {
      field: "value"
    }

    telesign.phoneid.phoneID(callback, phoneNumber, expectedParams);

    expect(telesign.phoneid.execute).toHaveBeenCalledWith(callback, "POST", "/v1/phoneid/1-123-123-1234", expectedParams);
    expect(telesign.phoneid.execute).toHaveBeenCalledTimes(1);
  });

  test('Test PhoneIDClient', () => {
    const phoneIDClient = new PhoneIDClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "1-123-123-1234";
    let callback = jest.fn();
    phoneIDClient.execute = jest.fn();

    phoneIDClient.phoneID(callback, phoneNumber);

    expect(phoneIDClient.execute).toHaveBeenCalledWith(callback, "POST", "/v1/phoneid/1-123-123-1234", null);
    expect(phoneIDClient.execute).toHaveBeenCalledTimes(1);
  });

  // Score test ------------------
  test('Test Telesign ScoreClient', () => {
    const telesign = teleSignSDK();
    const phoneNumber = "1-234-5678";
    const accountLifeCycleEvent = "create";
    const originatingIP = '1.2.3.4';
    const deviceId = 'unique_device_id';
    const accountId = 'Account_id';
    const emailAddress = 'test@test.com';
    const requestRiskInsights = 'INSIGHTS'
    let callback = jest.fn();
    telesign.score.execute = jest.fn();
    const expectedParams = {
      account_id: "Account_id",
      account_lifecycle_event: "create",
      device_id: "unique_device_id",
      email_address: "test@test.com",
      originating_ip: "1.2.3.4",
      request_risk_insights: "INSIGHTS"
    }

    telesign.score.score(callback,
      phoneNumber,
      accountLifeCycleEvent,
      originatingIP,
      deviceId,
      accountId,
      emailAddress,
      requestRiskInsights
    );

    expect(telesign.score.execute).toHaveBeenCalledWith(callback, "POST", "/v1/score/1-234-5678", expectedParams);
    expect(telesign.score.execute).toHaveBeenCalledTimes(1);
  });

  test('Test ScoreClient', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "1-234-5678";
    const accountLifeCycleEvent = "create";
    let callback = jest.fn();
    scoreClient.execute = jest.fn();
    const expectedParams = {
      account_lifecycle_event: "create"
    }

    scoreClient.score(callback, phoneNumber, accountLifeCycleEvent);

    expect(scoreClient.execute).toHaveBeenCalledWith(callback, "POST", "/v1/score/1-234-5678", expectedParams);
    expect(scoreClient.execute).toHaveBeenCalledTimes(1);
  });
});
