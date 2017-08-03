const test = require('tape');
const RestClient = require('../src/RestClient');
const uuidV4Js = require("uuid-v4.js");

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = 'VGVzdCBLZXk=';

const proxy = require('proxyrequire');

const Stub = proxy.proxy(() => require('../src/RestClient').request, {
    'stubbed_request': {'error': null, body: {'status': 200}},
});

// Tests ---
test('Test REST Client constructor', (assert) => {
    const rc = new RestClient(CUSTOMER_ID, API_KEY);

    assert.equal(rc.customer_id, CUSTOMER_ID, 'Customer ID set correctly');
    assert.equal(rc.api_key, API_KEY, 'API Key set correctly');

    assert.end();
});


test('Test generate Telesign headers with POST', (assert) => {
    const method = 'POST';
    const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
    const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
    const resource = '/v1/resource';
    const bodyParamsURLEncoded = 'test=param';

    const expectedAuthorizationHeader =
        'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:vXw/XzywdhgfEG2/zWLaFp7oXmjLB8iJDMndvDbZMjk=';

    const actualHeaders = RestClient.generateTeleSignHeaders(CUSTOMER_ID,
        API_KEY,
        method,
        resource,
        bodyParamsURLEncoded,
        date,
        nonce,
        userAgent = 'unit_test');

    assert.equal(actualHeaders['Authorization'], expectedAuthorizationHeader, 'Header Auth match');
    assert.end();
});


test('Test generate telesign headers unicode content', (assert) => {

    const method = 'POST';
    const date = 'Wed, 14 Dec 2016 18:20:12 GMT';
    const nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
    const resource = '/v1/resource';
    const bodyParamsURLEncoded = 'test=%CF%BF';

    const expectedAuthorizationHeader =
        'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:lPpGXw4jTRdaEp2obzYAD5rR+2aWDInJ8ThLbq0nTGU=';

    const actualHeaders = RestClient.generateTeleSignHeaders(CUSTOMER_ID,
        API_KEY,
        method,
        resource,
        bodyParamsURLEncoded,
        date,
        nonce,
        userAgent = 'unit_test');

    assert.equal(actualHeaders['Authorization'], expectedAuthorizationHeader, 'Header Auth match');
    assert.end();

});


test('Test generate telesign headers with GET', (assert) => {

    method = 'GET';
    date = 'Wed, 14 Dec 2016 18:20:12 GMT';
    nonce = 'A1592C6F-E384-4CDB-BC42-C3AB970369E9';
    resource = '/v1/resource';

    expectedAuthorizationHeader =
        'TSA FFFFFFFF-EEEE-DDDD-1234-AB1234567890:wscyrZZtA7kdXu0i4D5KXyDmBcwH52JF1feiEKp+ir0=';

    const actualHeaders = RestClient.generateTeleSignHeaders(CUSTOMER_ID,
        API_KEY,
        method,
        resource,
        '',
        date,
        nonce,
        userAgent = 'unit_test');

    assert.equal(actualHeaders['Authorization'], expectedAuthorizationHeader, 'Header Auth match');
    assert.end();

});

test('Test generate telesign headers default date and nonce', (assert) => {

    method = 'GET';
    resource = '/v1/resource';

    const actualHeaders = RestClient.generateTeleSignHeaders(CUSTOMER_ID,
        API_KEY,
        method,
        resource,
        '',
        userAgent = 'unit_test');

    try {
        uuidV4Js(actualHeaders['x-ts-nonce']);
    } catch (err) {
        assert.fail("x-ts-nonce is not a UUID");
    }

    assert.pass("Valid response since validation did not fail");
    assert.end();

});


// function test_callback(err, body) {
//     if (err != null) {
//         print(body);
//     }
// }
//
// test('Test POST', (assert) => {
//
//     testHost = 'https://test.com';
//     testResources = '/test/resource';
//     testParams = {'test': '123_\u03ff_test'};
//
//     rc = new RestClient(CUSTOMER_ID, API_KEY, restEndpoint = testHost);
//     rc.execute(test_callback, 'POST', testResources, params = testParams);
//
//     assert.end();
//
// });


test('Test template', (assert) => {
    assert.end();
});