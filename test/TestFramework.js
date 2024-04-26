const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  white: '\x1b[97m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m'
};

let passedCount = 0;
let failedCount = 0;

let allTestsCompleted = false;

async function test(testDescription, testFunction) {
  try {
    const result = testFunction();
    if (result instanceof Promise) {
      await result.then(() => {
        console.log(`${colors.bgGreen}${colors.white} PASS ${colors.reset} ${colors.white}${testDescription}${colors.reset}`);
        passedCount++;
      }).catch(error => {
        console.log(`${colors.bgRed}${colors.white} FAILED ${colors.reset} ${colors.white}${testDescription}${colors.reset}`);
        console.log(colors.red, error.message, colors.reset);
        failedCount++;
      });
    } else {
      console.log(`${colors.bgGreen}${colors.white} PASS ${colors.reset} ${colors.white}${testDescription}${colors.reset}`);
      passedCount++;
    }
  } catch (error) {
    console.log(`${colors.bgRed}${colors.white} FAILED ${colors.reset} ${colors.white}${testDescription}${colors.reset}`);
    console.log(colors.red, error.message, colors.reset);
    failedCount++;
  }

  if (allTestsCompleted) {
    printResult();
  }
}

async function it(testDescription, testFunction) {
  await test(testDescription, testFunction);
}

function mockFunction() {
  let callCount = 0;
  const mockFn = function (...args) {
    callCount++;
    mockFn.mock.calls.push(args);
  };
  mockFn.mock = {
    calls: [],
    callCount: () => callCount,
  };
  mockFn.mock.calls = [];
  mockFn.mockReset = function () {
    mockFn.mock.calls = [];
    callCount = 0;
  };
  return mockFn;
}

function expect(value) {
  const calledArgs = [];

  return {
    toBe: function(expected) {
      if (value !== expected) {
        throw new Error(`Assertion failed: Expected ${value} to be ${expected}`);
      }
    },
    toEqual: function(expected) {
      const sortedValue = sortObject(value);
      const sortedExpected = sortObject(expected);

      const valueJson = JSON.stringify(sortedValue);
      const expectedJson = JSON.stringify(sortedExpected);

      if (typeof sortedValue !== typeof sortedExpected || valueJson !== expectedJson) {
        throw new Error(`Assertion failed: Expected ${JSON.stringify(sortedValue)} to equal ${JSON.stringify(sortedExpected)} with the same type`);
      }
    },
    toContain: function(substring) {
      if (!value.includes(substring)) {
        throw new Error(`Assertion failed: Expected ${value} to contain ${substring}`);
      }
    },
    toHaveBeenCalled: function() {
      return {
        withArgs: function(...expectedArgs) {
          const calls = value.mock.calls;
          const matchingCall = calls.find(call => JSON.stringify(call) === JSON.stringify(expectedArgs));
          if (!matchingCall) {
            throw new Error(`Assertion failed: Function was not called with arguments ${JSON.stringify(expectedArgs)}`);
          }
        }
      };
    },
    toHaveBeenCalledWith: function(...args) {
      calledArgs.push(args);
      return {
        times: (count) => {
          if (calledArgs.length !== count) {
            throw new Error(`Assertion failed: Function was called ${calledArgs.length} times, expected ${count} times`);
          }
        },
        withArgs: (...expectedArgs) => {
          if (!calledArgs.some(call => JSON.stringify(call) === JSON.stringify(expectedArgs))) {
            throw new Error(`Assertion failed: Function was not called with arguments ${JSON.stringify(expectedArgs)}`);
          }
        }
      };
    },
    toHaveBeenCalledTimes: function (expectedCount) {
      if (typeof value.mock === 'undefined') {
        throw new Error('toHaveBeenCalledTimes matcher can only be used with mocked functions');
      }
      if (value.mock.callCount() !== expectedCount) {
        throw new Error(`Assertion failed: Expected function to have been called ${expectedCount} times, but it was called ${value.mock.callCount()} times`);
      }
    },
    toBeTruthy: function() {
      if (!value) {
        throw new Error(`Assertion failed: Expected ${value} to be truthy`);
      }
    },
    toHaveProperty: function(propertyName, valueMatcher) {
      if (!(propertyName in value)) {
        throw new Error(`Assertion failed: Expected object to have property "${propertyName}"`);
      }

      if (typeof valueMatcher === 'function') {
        valueMatcher(value[propertyName]);
      } else if (valueMatcher !== undefined && value[propertyName] !== valueMatcher) {
        throw new Error(`Assertion failed: Expected "${propertyName}" to have value "${valueMatcher}", but received "${value[propertyName]}"`);
      }
    }
  };
}

function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  const sortedObj = {};
  Object.keys(obj).sort().forEach(key => {
    sortedObj[key] = sortObject(obj[key]);
  });
  return sortedObj;
}

function printResult() {
  console.log(`${colors.bold}Tests: ${colors.green}${passedCount} passed${colors.reset}, ${colors.bold}${colors.red}${failedCount} failed${colors.reset}, ${colors.bold}${colors.white}${passedCount + failedCount} total${colors.reset}`);
}

async function waitForTests() {
  await new Promise(resolve => setTimeout(resolve, 0));
  allTestsCompleted = true;
}

async function runTests() {
  await waitForTests();
  printResult();
}

module.exports = { test, it, expect, mockFunction, waitForTests, runTests };
