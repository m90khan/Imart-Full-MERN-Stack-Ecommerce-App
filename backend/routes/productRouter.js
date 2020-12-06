import router from 'express';
import {
  aliasTopProducts,
  getAllProducts,
  getProduct,
} from '../controllers/productCtrl.js';
const productRouter = router.Router();
// GEt 4 cheap and rated Products
productRouter.route('/top-4-cheap').get(aliasTopProducts, getAllProducts);
// All Products
productRouter.route('/').get(getAllProducts);
// Single Product
productRouter.route('/:id').get(getProduct);

export default productRouter;
