const Joi = require('joi');

const batchUsers = {
  body: {
    verb: Joi.string().required(),
    url: Joi.string().required(),
    payloads: Joi.array().required(),
    requestBody: Joi.object(),
  },
};

module.exports = {
  batchUsers,
};
