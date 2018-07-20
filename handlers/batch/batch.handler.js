const { sendGetRequest, sendPutRequest } = require('../../service/http.service');
const { mapPutResult } = require('../../common/mapper');

async function processGetRequest(fullUrl, retryCounter) {
  let counter = retryCounter;
  try {
    return await sendGetRequest(fullUrl);
  } catch (e) {
    console.log('Error in sendPutRequest: ', e.message);
    if (counter) {
      throw new Error();
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
    return { user: { userId, data: response.data } };
  } catch (e) {
    console.log(e);
    return { user: { userId, data: { status: 503, message: 'Invocation has failed' } } };
  }
}

async function handleGetRequest(url, payloads) {
  const baseUrl = url.replace('{userId}', '');
  const promises = [];
  let result;
  try {
    const userIds = payloads.map(userPayload => userPayload.userId);

    userIds.forEach((id) => {
      promises.push(buildGetUrlAndSend(id, baseUrl));
    });

    result = await Promise.all(promises);
  } catch (e) {
    console.log('Unknown error appeared: ', e);
  }

  return result;
}


async function processPutRequest(fullUrl, requestBody, retryCounter) {
  let counter = retryCounter;
  try {
    await sendPutRequest(fullUrl, requestBody);
  } catch (e) {
    console.log('Error in sendPutRequest: ', e.message);
    if (counter) {
      throw new Error();
    } else {
      counter += 1;
      await processPutRequest(fullUrl, requestBody, counter);
    }
  }
}

async function buildPutUrlAndSend(userId, baseUrl, requestBody) {
  const fullUrl = baseUrl + userId;
  try {
    await processPutRequest(fullUrl, requestBody, 0);
    return { Success: userId };
  } catch (e) {
    console.log(e);
    return { Fail: userId };
  }
}

async function handlePutRequest(url, payloads, requestBody) {
  const baseUrl = url.replace('{userId}', '');
  const promises = [];
  let result;
  try {
    const userIds = payloads.map(userPayload => userPayload.userId);

    userIds.forEach((id) => {
      promises.push(buildPutUrlAndSend(id, baseUrl, requestBody));
    });

    result = await Promise.all(promises);
  } catch (e) {
    console.log('Unknown error appeared: ', e);
  }

  return mapPutResult(result);
}

module.exports = {
  handleGetRequest,
  handlePutRequest,
};
