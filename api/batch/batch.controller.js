const { handleGetRequest, handlePutRequest } = require('../../handlers/batch/batch.handler');

const handlersMap = {
  GET: handleGetRequest,
  PUT: handlePutRequest,
};

const batchUsers = async (req, res, next) => {
  const {
    url, verb, payloads, requestBody,
  } = req.body;
  let batchResult;
  try {
    const handlerFunc = handlersMap[verb];
    if (!handlerFunc) {
      // method not allowed
      res.status(405);
    } else {
      batchResult = await handlerFunc(url, payloads, requestBody);
      res.json(batchResult);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  batchUsers,
};
