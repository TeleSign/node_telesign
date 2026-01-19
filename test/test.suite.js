const { restClient } = require('./RestClient.test.js');
const { requestWrapper } = require('./RequestWrapper.test.js');
const { scoreClient } = require('./ScoreClient.test.js');
const { runTests } = require('./TestFramework');

restClient();
requestWrapper();
scoreClient();
runTests();
