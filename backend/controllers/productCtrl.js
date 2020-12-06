// import products from '../data/products.js';
import Product from '../models/productModel.js';
import apiFeatures from '../utils/apiFeatures.js';
import asyncHandler from 'express-async-handler';
import appError from '../utils/appError.js';
/*
@desc     : Fetch 4 Cheap Products
@route    : GET /api/v1/products
@access   : Public 
*/
export const aliasTopProducts = (req, res, next) => {
  req.query.limit = '4';
  req.query.sort = 'price,-rating';
  req.query.fields = 'name,price,brand,category,description,countInStock';
  console.log(req.query.limit);
  next();
};

/*
@desc     : Fetch All Products
@route    : GET /api/v1/products
@access   : Public 
*/
export const getAllProducts = asyncHandler(async (req, res, next) => {
  let products = await apiFeatures(Product, '', req.query)();
  if (!products) {
    next(new appError('No Products Found', 404));
  }
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products: products,
    },
  });
});

/*
@desc     : Fetch Single Products
@route    : GET /api/v1/products/:id
@access   : Public 
*/
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new appError('No Product found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});
