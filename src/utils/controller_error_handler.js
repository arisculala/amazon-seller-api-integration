const { HttpStatusCode } = require('./httpstatus');
const StandardError = require('./standard_error');

class ControllerErrorHandler {
  static handleErrorResponse(res, error) {
    let errorResponse;
    if (error instanceof StandardError) {
      errorResponse = {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details
      };
    } else {
      errorResponse = {
        status: HttpStatusCode.InternalServerError,
        message:
          'The server encountered an error and could not complete your request.',
        details: error.message
      };
    }
    res.status(errorResponse.status).json(errorResponse);
  }
}

module.exports = ControllerErrorHandler;
