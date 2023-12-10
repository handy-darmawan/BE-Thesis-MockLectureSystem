const { ResponseError } = require("../error/response-error");


const errorMiddleware = (error, request, response, next) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseError) {
    response.status(error.status).json({
      error: error.message,
    });
  } else {
    response.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  errorMiddleware,
};

