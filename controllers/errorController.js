const AppError = require('./../utils/appError');

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    ok: err.ok,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    // ERROR ACCURE DUE TO CLIENT
    res.status(err.statusCode).json({
      ok: err.ok,
      message: err.message,
    });
  } else {
    // ERROR ACCURE DUE TO UNKNOWN RESON SEND SOME GENERIC MESSAGE
    // DO NOT LEAK THE ERROR DETAILS
    console.error('⚠️', err);

    res.status(500).json({
      ok: false,
      message: 'Something went wrong,',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid mogodb id :${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateKeyErrorDB = (err) => {
  const message = `Duplicate key: ${err.keyValue.title} , try with another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = err.message;
  return new AppError(message, 400);
};

//
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.ok = err.ok || false;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
    //
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateKeyErrorDB(err);
    sendErrorProd(error, req, res);
  }
};
