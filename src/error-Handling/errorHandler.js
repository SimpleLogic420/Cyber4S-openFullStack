function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(err.status).json({ message: err.error });
    res.end();
  }

  
  module.exports = {errorHandler}
  