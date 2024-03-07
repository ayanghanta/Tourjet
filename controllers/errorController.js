module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.ok = err.ok || false;

  res.status(err.statusCode).json({
    ok: err.ok,
    message: err.message,
  });
};
