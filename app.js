const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/batch/index');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/batch', api);

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) {
        err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    }
    res.status(err.statusCode).send(err.message);
});

module.exports = app;
