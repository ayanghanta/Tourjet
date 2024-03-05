const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRout');

const app = express();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);

module.exports = app;
