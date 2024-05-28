class StandardError extends Error {
  constructor({ code, status, message, details, error }) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
    this.details = details;
    if (error instanceof Error) {
      this.details = [
        {
          message: error.message
        }
      ];
    }
  }
}

module.exports = StandardError;
