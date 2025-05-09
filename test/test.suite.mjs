import { restClient } from './RestClient.test.mjs';
import { requestWrapper } from './RequestWrapper.test.mjs';
import { runTests } from './TestFramework.mjs';

restClient();
requestWrapper();
runTests();
