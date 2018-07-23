const request = require('request-promise');

function sendGetRequest(url) {
    const options = {
      uri: url,
      json: true,
      method: 'GET',
      resolveWithFullResponse: true
    };
    return request(options);
}

function sendPutRequest(url, body) {
  const options = {
    uri: url,
      json: true,
      method: 'PUT',
      body: body,
      resolveWithFullResponse: true
  };
  return request(options);
}

module.exports = {
  sendGetRequest,
  sendPutRequest,
};
