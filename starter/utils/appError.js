class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // builtin error class accepts only message
                       //parent clas is Error which contains only error properties as message

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error';
        this.isOperational = true; //errors we handle and send back to client are only operational errors


        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;