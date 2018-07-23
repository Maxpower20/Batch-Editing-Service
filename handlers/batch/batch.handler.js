const { sendGetRequest, sendPutRequest } = require('../../service/http.service');
const { mapPutResult } = require('../../common/mapper');

async function processGetRequest(fullUrl, retryCounter) {
  let counter = retryCounter;
  try {
    return await sendGetRequest(fullUrl);
  } catch (e) {
    console.log(`Error in sendPutRequest: ${e.message}`);
    if (counter) {
        throw new Error(`${e.response.statusCode}  ${e.response.statusMessage}`);
    } else {
      counter += 1;
      await processGetRequest(fullUrl, counter);
    }
  }
}

async function buildGetUrlAndSend(userId, baseUrl) {
  const fullUrl = baseUrl + userId;
  try {
    const response = await processGetRequest(fullUrl, 0);
    return { user: { userId, data: response.body } };
  } catch (e) {
    console.log(e);
    return { user: { userId, data: e.message } };
  }
}

async function handleGetRequest(url, payloads) {
  const baseUrl = url.replace('{userId}', '');
  const promises = [];
  let result;
  try {
    payloads.forEach((userPayload) => {
      promises.push(buildGetUrlAndSend(userPayload.userId, baseUrl));
    });

    result = await Promise.all(promises);
  } catch (e) {
      throw new Error(e.message);
  }

  return result;
}


async function processPutRequest(fullUrl, requestBody, retryCounter) {
  let counter = retryCounter;
  try {
    return await sendPutRequest(fullUrl, requestBody);
  } catch (e) {
    console.log(`Error in sendPutRequest: ${e.message}`);
    if (counter) {
      throw new Error(`${e.response.statusCode}  ${e.response.statusMessage}`);
    } else {
      counter += 1;
      await processPutRequest(fullUrl, requestBody, counter);
    }
  }
}

async function buildPutUrlAndSend(userId, baseUrl, requestBody) {
  const fullUrl = baseUrl + userId;
  try {
    const response = await processPutRequest(fullUrl, requestBody, 0);
    return { Success: userId };
  } catch (e) {
    console.log(e);
    return { Fail: { userId, message: e.message} };
  }
}

async function handlePutRequest(url, payloads, requestBody) {
  const baseUrl = url.replace('{userId}', '');
  const promises = [];
  let result;
  try {
    payloads.forEach((userPayload) => {
      promises.push(buildPutUrlAndSend(userPayload.userId, baseUrl, requestBody));
    });

    result = await Promise.all(promises);
  } catch (e) {
    throw new Error(e.message);
  }

  return mapPutResult(result);
}

module.exports = {
  handleGetRequest,
  handlePutRequest,
};
