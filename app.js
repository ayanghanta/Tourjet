const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

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

//GLOBAL ERROR HANDLERS
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found in server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
