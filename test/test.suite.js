const { restClient } = require('./RestClient.test.js');
const { requestWrapper } = require('./RequestWrapper.test.js');
const { runTests } = require('./TestFramework');

restClient();
requestWrapper();
runTests();
