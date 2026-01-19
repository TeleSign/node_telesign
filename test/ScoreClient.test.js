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
      email_address: "user@example.com",
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
}

module.exports = { scoreClient };

scoreClient();
runTests();     