const { ValidationError } = require("sequelize");

function logErrors(error, request, response, next) {
  console.log(error);
  next(error)
}

function errorHandler(error, request, response, next) {
  response.status(500).json(
    {
      message: error.message,
      stack: error.stack
    }
  );
}

function boomErrorHandler(error, request, response, next) {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json(
      output.payload
    );
  } else {
    next(error)
  }

}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  else {
    next(err);
  }
}



module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
