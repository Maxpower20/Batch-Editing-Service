const { Router } = require('express');
const validate = require('../../common/validator');
const schema = require('./schema');
const { batchUsers } = require('./batch.controller');

const router = new Router();

router
  .route('')
  .put(validate(schema.batchUsers), batchUsers);


module.exports = router;
