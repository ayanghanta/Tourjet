const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRout');
const userRouter = require('./routers/userRout');

const app = express();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));

// Body parser
app.use(express.json());

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
