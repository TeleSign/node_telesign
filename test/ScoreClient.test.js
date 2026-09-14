const ScoreClient = require('../src/ScoreClient.js');
const FetchRequestWrapperMock = require('./RequestWrapperMock');
const { test, expect, mockFunction, runTests } = require('./TestFramework');

async function scoreClient() {
  const customerId = 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const requestWrapper = new FetchRequestWrapperMock();

  // Test ScoreClient constructor defaults
  test('Test ScoreClient constructor defaults', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    expect(scoreClient.restEndpoint).toBe('https://detect.telesign.com');
    expect(scoreClient.timeout).toBe(15000);
    expect(scoreClient.contentType).toBe('application/x-www-form-urlencoded');
    expect(scoreClient.scoreResource).toBe('/intelligence/phone');
  });

  // Test basic score call (required params only)
  test('Test ScoreClient basic score call', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "11234567890";
    const accountLifecycleEvent = "create";
    let callback = mockFunction();
    scoreClient.execute = mockFunction();

    scoreClient.score(callback, phoneNumber, accountLifecycleEvent);

    expect(scoreClient.execute).toHaveBeenCalled();
    expect(scoreClient.execute.mock.calls[0][0]).toBe(callback);
    expect(scoreClient.execute.mock.calls[0][1]).toBe("POST");
    expect(scoreClient.execute.mock.calls[0][2]).toBe("/intelligence/phone");
    expect(scoreClient.execute.mock.calls[0][3]).toEqual({
      phone_number: "11234567890",
      account_lifecycle_event: "create"
    });
    expect(scoreClient.execute).toHaveBeenCalledTimes(1);
  });

  // Test score call with ALL optional params
  test('Test ScoreClient score with all optional params', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "11234567890";
    const accountLifecycleEvent = "create";
    const options = {
      account_id: "account-123",
      device_id: "device-456",
      email_address: "support@vero-finto.com",
      external_id: "external-789",
      originating_ip: "192.0.2.1"
    };
    let callback = mockFunction();
    scoreClient.execute = mockFunction();

    scoreClient.score(callback, phoneNumber, accountLifecycleEvent, options);

    expect(scoreClient.execute.mock.calls[0][3]).toEqual({
      phone_number: "11234567890",
      account_lifecycle_event: "create"
    });
  });

  // Test score call with empty options object
  test('Test ScoreClient score with empty options', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "11234567890";
    const accountLifecycleEvent = "create";
    let callback = mockFunction();
    scoreClient.execute = mockFunction();

    scoreClient.score(callback, phoneNumber, accountLifecycleEvent, {});

    expect(scoreClient.execute.mock.calls[0][3]).toEqual({
      phone_number: "11234567890",
      account_lifecycle_event: "create"
    });
  });

  // Test different lifecycle events
  test('Test ScoreClient with different lifecycle events', () => {
    const validEvents = ["create", "sign-in", "transact", "update", "delete"];
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    validEvents.forEach(event => {
      scoreClient.execute = mockFunction();
      scoreClient.score(mockFunction(), "11234567890", event);
      expect(scoreClient.execute).toHaveBeenCalledTimes(1);
    });
  });

  // Test TelesignSDK.score integration
  test('Test Telesign ScoreClient integration', () => {
    const TeleSignSDK = require('../src/TeleSign');
    const telesign = new TeleSignSDK(customerId, apiKey);
    const phoneNumber = "11234567890";
    const accountLifecycleEvent = "create";
    let callback = mockFunction();
    telesign.score.execute = mockFunction();

    telesign.score.score(callback, phoneNumber, accountLifecycleEvent);

    expect(telesign.score.execute).toHaveBeenCalledWith(callback, "POST", "/intelligence/phone", {
      phone_number: "11234567890",
      account_lifecycle_event: "create"
    });
  });

  test('Test Telesign ScoreClient', () => {
    const TeleSignSDK = require('../src/TeleSign');
    const telesign = new TeleSignSDK(customerId, apiKey);
    const phoneNumber = "1-234-5678";
    const accountLifeCycleEvent = "create";
    const originatingIP = '1.2.3.4';
    const deviceId = 'unique_device_id';
    const accountId = 'Account_id';
    const emailAddress = 'support@vero-finto.com';
    const requestRiskInsights = 'INSIGHTS';
    const callback = mockFunction();
    const expectedParams = {
      account_id: "Account_id",
      account_lifecycle_event: "create",
      device_id: "unique_device_id",
      email_address: "support@vero-finto.com",
      originating_ip: "1.2.3.4",
      request_risk_insights: "INSIGHTS"
    };

    telesign.score.client.execute = mockFunction();

    telesign.score.score(
      callback,
      phoneNumber,
      accountLifeCycleEvent,
      originatingIP,
      deviceId,
      accountId,
      emailAddress,
      requestRiskInsights
    );

    expect(telesign.score.client.execute).toHaveBeenCalledWith(
      callback,
      "POST",
      "/intelligence/phone",
      expectedParams
    );
    expect(telesign.score.client.execute).toHaveBeenCalledTimes(1);
  });

  test('Test ScoreClient - Intelligence Cloud', () => {
    const scoreClient = new ScoreClient(requestWrapper, customerId, apiKey);
    const phoneNumber = "11234567890";
    const accountLifeCycleEvent = "create";
    const callback = mockFunction();

    scoreClient.execute = mockFunction();

    scoreClient.score(callback, phoneNumber, accountLifeCycleEvent);

    expect(scoreClient.execute).toHaveBeenCalled();
    expect(scoreClient.execute.mock.calls[0][0]).toBe(callback);
    expect(scoreClient.execute.mock.calls[0][1]).toBe("POST");
    expect(scoreClient.execute.mock.calls[0][2]).toBe("/intelligence/phone");
    expect(scoreClient.execute.mock.calls[0][3]).toEqual({
      phone_number: "11234567890",
      account_lifecycle_event: "create"
    });
    expect(scoreClient.execute).toHaveBeenCalledTimes(1);
  });

  test('Test Telesign ScoreAdapter email intelligence', () => {
    const TeleSignSDK = require('../src/TeleSign');
    const telesign = new TeleSignSDK(customerId, apiKey);
    const emailAddress = 'support@vero-finto.com';
    const accountLifecycleEvent = 'create';
    const callback = mockFunction();
    const options = {
      accountId: 'account-id',
      phoneNumber: '11234567890',
      deviceId: 'device-id',
      externalId: 'external-id',
      originatingIp: '192.0.2.1'
    };

    telesign.score.client.execute = mockFunction();

    telesign.score.emailIntelligence(
      callback,
      emailAddress,
      accountLifecycleEvent,
      options
    );

    expect(telesign.score.client.contentType).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(telesign.score.client.execute).toHaveBeenCalledWith(
      callback,
      'POST',
      '/intelligence/email',
      {
        email_address: emailAddress,
        account_lifecycle_event: accountLifecycleEvent,
        account_id: options.accountId,
        phone_number: options.phoneNumber,
        device_id: options.deviceId,
        external_id: options.externalId,
        originating_ip: options.originatingIp
      },
      'Basic'
    );
    expect(telesign.score.client.execute).toHaveBeenCalledTimes(1);
  });
}

module.exports = { scoreClient };

scoreClient();
runTests();     