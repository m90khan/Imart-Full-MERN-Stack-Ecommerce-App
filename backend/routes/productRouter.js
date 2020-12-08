import router from 'express';

import {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  aliasTopProducts,
} from '../controllers/productController.js';
import { restrictTo } from '../controllers/usersCtrl.js';
const productRouter = router.Router();

// GEt 4 cheap and rated Products
productRouter.route('/top-4-cheap').get(aliasTopProducts, getAllProducts);

// All Products
productRouter
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), createProduct);
// Reviews
productRouter.route('/:id/reviews').post(protect, createProductReview);

// top products
productRouter.get('/top', getTopProducts);

// Single Product
productRouter
  .route('/:id')
  .get(getProduct)
  .delete(protect, restrictTo('admin'), deleteProduct)
  .put(protect, restrictTo('admin'), updateProduct);

export default productRouter;
