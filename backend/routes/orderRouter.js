import router from 'express';

import {
  addOrderItems,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
} from '../controllers/orderCtrl.js';
import { protect } from '../controllers/authCtrl.js';
import { getMe, restrictTo } from '../controllers/usersCtrl.js';

const orderRouter = router.Router();

// Orders
orderRouter
  .route('/')
  .get(protect, restrictTo('admin'), getAllOrders)
  .post(protect, getMe, addOrderItems);
// Logged in user orders
orderRouter.route('/myorders').get(protect, getMyOrders);
// Order
orderRouter.route('/:id').get(protect, getOrder);

//Pay : update order status afer paid
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);
//deliver order
orderRouter
  .route('/:id/deliver')
  .put(protect, restrictTo('admin'), updateOrderToDelivered);
export default orderRouter;
