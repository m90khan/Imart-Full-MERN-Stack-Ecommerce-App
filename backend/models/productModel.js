import mongoose from 'mongoose';
import validator from 'validator';

// {
//     _id: '6',
//     name: 'Amazon Echo Dot 3rd Generation',
//     image: '/images/alexa.jpg',
//     description:
//       'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
//     brand: 'Amazon',
//     category: 'Electronics',
//     price: 29.99,
//     countInStock: 0,
//     rating: 4,
//     numReviews: 12,
//   },

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A review must have user name'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 0'],
      max: [5, 'Rating must be equal or below 5'],
    },
    comment: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      maxlength: [100, 'A user name cannot exceed above 40 characters'],
      minlength: [3, 'A user name cannot be less than 3 characters'],
    },

    image: {
      type: String,
      default: 'default.jpg',
    },
    description: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Product must have a brand name'],

      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product must have a category'],
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'A product must have a price'],
    },
    countInStock: {
      type: Number,
      default: 0,
      required: [true, 'Product must have available stock number'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 0'],
      max: [5, 'Rating must be equal or below 5'],
      // set: val => Math.round(val * 10) / 10 // this runs everytime a value is added  // 4.76
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
