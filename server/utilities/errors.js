class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        this.errorData = JSON.stringify({
            status: "error",
            statusCode: statusCode,
            message: message
        });

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;