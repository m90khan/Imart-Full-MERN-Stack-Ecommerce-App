import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import appError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Create jwt Token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// Set jwt token cookie and send response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  /* create and send jwt token as http cookie  */
  const cookieOptions = {
    expires: new Date(
      // convert to miliseconds
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, // https
    httpOnly: true, // cookie cannot be accessed by browser
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  //remove password property from response object output
  user.password = undefined;
  //3-send token to client
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};
/*
  @desc     : Login User (Authenticate and get Token)
  @route    : POST /api/v1/users/login
  @access   : Public 
  */
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //1- check if email and password exists
  if (!email || !password) {
    return next(new appError('Please provide email and password', 400));
  }
  //2- check if user exists and password is correct ,

  const user = await User.findOne({ email: email }).select('+password');
  // correctPassword is the instant method defined in user model to compare password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('Incorrect email or password', 401));
  }
  //3 send token to client
  createSendToken(user, 200, res);
});

/*
@desc     : JWT Token validation for Private access
@access   : Middleware 
*/
export const protect = asyncHandler(async (req, res, next) => {
  // 1- getting token and check if there exists  console.log(req.headers)
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new appError('You are not logged in! Please login to get access.', 401));
  }
  /* verify if something manipulated the data or token expired
       2- validate the token : verification  jwt.verify(token, secretOrPublicKey, [options, callback]) */
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3- if validation successfull then check if user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError(
        'The user belongs to this token does no longer exists, Please create a new account ',
        401
      )
    );
  }
  // 4- check if user changed password after jwt token issued : create another instance method
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new appError('Your Password has been changed recently, Please login again.', 401)
    );
  }
  // 5- Grant access to the provided route
  req.user = currentUser;
  console.log(req.user);
  // res.locals.user = currentUser; // to use it all templates
  next();
});
/*
@desc     : Register New User
@route    : POST /api/v1/users/signup
@access   : Public 
*/
export const userSignup = asyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return next(new appError('An account is already exists with this email', 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 201, res);
});
/*
@desc     : Logout User
@route    : POST /api/v1/users/logout
@access   : Private 
*/
export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

//filter only the allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

/*
@desc     : Update User Profile
@route    : PUT /api/v1/users/profile
@access   : Private 
*/
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
    }
    const filteredBody = filterObj(req.body, 'name', 'email');

    // const updatedUser = await user.save();
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } else {
    return next(new appError('User Not Found', 404));
  }
});
