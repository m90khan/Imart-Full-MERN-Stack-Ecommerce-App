/*
Error handling for production and devlopment evironment
*/
import appError from './../utils/appError.js';

// CastError- 1- Mongoose wrong id
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new appError(message, 404);
};

// ErrorCode :11000  => 2- duplicate creation error
const handleDuplicateFieldsDB = (err) => {
  // use regex to extract the duplicate field between "" marks in error.errmsg
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value:${value} please use another value`;
  return new appError(message, 400);
};
// ValidationError => 3- duplication error : an error object => extract duplicate properties
const handleValidationErrorDB = (err) => {
  // loop over the error arrays and return errors
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data: ${errors.join('. ')}`;
  return new appError(message, 400);
};

/*  DEVELOPMENT ERRORS */
const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  //   console.error('ERROR 😱', err);
  //   return res.status(err.statusCode).render('error', {
  //     title: 'Something went wrong!',
  //     msg: err.message,
  //   });
};

/* PRODUCTION ERRORS */
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // Display trusted errors
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // 1) Log error
    console.error('ERROR 😱', err);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  //   if (err.isOperational) {
  //     return res.status(err.statusCode).render('error', {
  //       title: 'Something went wrong!',
  //       msg: err.message,
  //     });
  //   }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 😱', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

// * JWT ERRORS

const handleJWTError = () => {
  return new appError('Invalid Token, Please log in again', 401);
};
const handleJWTExpiredError = () => {
  return new appError('Your Token has expired! Please log in again', 401);
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    /*
Three types of errors cause mongodb driver and by mongoose which we can marked as operational errors
- 1- CastError - wrong id (when mongoose unable to convert or find id)
-2- ErrorCode: 11000 - duplicate tour creation error
-3- err.name: 'ValidationError' => duplication error :
//  an error object => extract duplicate properties
 // validation error when updating product         error = handleCaseErrorDB(error);
*/
    // Topic : Validation Errors from Mongoose
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    //* JWT TOKEN ERRORS
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }
    sendErrorProd(error, req, res);
  }
};
