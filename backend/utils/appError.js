class appError extends Error {
  constructor(message, statusCode) {
    super(message); // built in err message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // error created by users/systems are operational errors
    this.isOperational = true;

    /*
      including err.stack for location where error happens 
      (current object, app Error class itself)
  */
    Error.captureStackTrace(this, this.constructor);
  }
}

export default appError;
