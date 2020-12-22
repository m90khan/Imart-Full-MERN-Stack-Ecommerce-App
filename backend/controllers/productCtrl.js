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
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // let products = await apiFeatures(Product, '', req.query)();
  if (!products) {
    return next(new appError('No Products Found', 404));
  }
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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
    product,
  });
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(204).json({ message: 'Product removed' });
  } else {
    return next(new appError('No Product found with that ID', 404));
  }
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    return next(new appError('No Product found with that ID', 404));
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next(new appError('No Product found with that ID', 400));
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    return next(new appError('No Product found with that ID', 404));
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});
