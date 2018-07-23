const request = require('request-promise');
const Bottleneck = require('bottleneck');
const constants = require('../common/constants');

const limiter = new Bottleneck({
    minTime: 150 //in ms -> handle Rate Limit here
});

const sendGetRequest = limiter.wrap(sendGet);

const sendPutRequest = limiter.wrap(sendPut);

function sendGet(url) {
    const options = {
      uri: url,
      json: true,
      method: constants.HTTP_METHOD.GET,
      resolveWithFullResponse: true
    };
    return request(options);
}

function sendPut(url, body) {
  const options = {
    uri: url,
      json: true,
      method: constants.HTTP_METHOD.PUT,
      body: body,
      resolveWithFullResponse: true
  };
  return request(options);
}

module.exports = {
  sendGetRequest,
  sendPutRequest,
};
