const { HttpStatusCode } = require('../utils/httpstatus');

function validateRequest({ bodySchema, paramsSchema, headersSchema }) {
  return (req, res, next) => {
    // Validate request body
    if (bodySchema) {
      const { error: bodyError } = bodySchema.validate(req.body);
      if (bodyError) {
        return handleBadRequestValidationError(res, bodyError);
      }
    }

    // Validate request parameters
    if (paramsSchema) {
      const { error: paramsError } = paramsSchema.validate(req.params);
      if (paramsError) {
        return handleBadRequestValidationError(res, bodyError);
      }
    }

    // Validate request headers
    if (headersSchema) {
      const { error: headersError } = headersSchema.validate(req.headers);
      if (headersError) {
        return handleBadRequestValidationError(res, bodyError);
      }
    }

    next(); // Proceed to the next middleware
  };
}

function handleBadRequestValidationError(res, error) {
  return res.status(HttpStatusCode.BadRequest).json({
    status: HttpStatusCode.BadRequest,
    message: 'Bad Request: Validation error',
    details: error.details
  });
}

function validateResponse(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(res.body);
    if (error) {
      return handleResponseValidationError(res, error);
    }
    next(); // Proceed to the next middleware
  };
}

function handleResponseValidationError(res, error) {
  return res.status(HttpStatusCode.InternalServerError).json({
    status: HttpStatusCode.InternalServerError,
    message: 'Internal Server Error',
    details: error.details
  });
}

module.exports = { validateRequest, validateResponse };
