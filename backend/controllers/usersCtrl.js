// import products from '../data/products.js';
import User from '../models/userModel.js';
import apiFeatures from '../utils/apiFeatures.js';
import asyncHandler from 'express-async-handler';
import appError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

/*
  @desc     : Allow access to User
  @route    : GET /api/v1/users/login
  @access   : Private 
  */
export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
//User Restriction
export let restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // req.user is passed from the previous middleware authCotroller.protect
      return next(new appError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export const getUserProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new appError('No User found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// @desc    Get all users
// @route   GET /api/v1users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return next(new appError('No User found', 404));
  }
  res.status(200).json(users);
});

// @desc    Get user by ID   : not used
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    return next(new appError('No User found', 404));
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(204).json({ message: 'User removed' });
  } else {
    return next(new appError('No User found', 404));
  }
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.role = req.body.role || user.role;

    const updatedUser = await user.save({ validateBeforeSave: false });

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    return next(new appError('No User found', 404));
  }
});
