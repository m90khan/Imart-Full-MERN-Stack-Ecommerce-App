// import products from '../data/products.js';
import User from '../models/userModel.js';
import apiFeatures from '../utils/apiFeatures.js';
import asyncHandler from 'express-async-handler';
import appError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import userRouter from '../routes/userRouter.js';

/*
  @desc     : Allow access to User
  @route    : GET /api/v1/users/login
  @access   : Private 
  */
export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getUserProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new appError('No User found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});
