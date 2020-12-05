const productRouter = require('express').Router();
const productCtrl = require('../controllers/productCtrl');
productRouter.route('/').get(productCtrl.getAllProducts);
productRouter.route('/:id').get(productCtrl.getProduct);

module.exports = productRouter;
