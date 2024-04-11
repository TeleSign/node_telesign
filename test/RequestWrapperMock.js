const { RequestWrapper } = require('../src/RequestWrapper');

class FetchRequestWrapperMock extends RequestWrapper {
  constructor(mockResponse, mockError, responseBody, optionsCallback) {
    super();
    this.mockResponse = mockResponse || null;
    this.mockError = mockError || null;
    this.responseBody = responseBody || null;
    this.optionsCallback = optionsCallback || null
  }

  request(options, callback) {
    if (this.mockError) {
      // Simulate an error
      callback(this.mockError, null, this.responseBody);
    } else {
      // Simulate a successful response
      if (this.optionsCallback) { 
      	this.optionsCallback(options)
      }
      callback(null, this.mockResponse, JSON.stringify(this.responseBody));
    }
  }
}

module.exports = FetchRequestWrapperMock;
