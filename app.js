const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/batch/index');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/batch', api);

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
