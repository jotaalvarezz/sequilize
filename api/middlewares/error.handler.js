function logError(err, req, res, next) {
  console.error('logError ', err);
  next(err);
}

function handleError(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomHandleError(err, req, res, next) {
  if (err.isBoom) {
    const {output} = err
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err)
  }
}

module.exports = {
  logError,
  handleError,
  boomHandleError,
};
