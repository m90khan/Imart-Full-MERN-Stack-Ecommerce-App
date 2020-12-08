import router from 'express';

import {
  addOrderItems,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderCtrl.js';
import { protect } from '../controllers/authCtrl.js';
import { getMe } from '../controllers/usersCtrl.js';

const orderRouter = router.Router();

// Orders
orderRouter.route('/').get(getAllOrders).post(protect, addOrderItems);
// Logged in user orders
orderRouter.route('/myorders').get(protect, getMyOrders);
// Order
orderRouter.route('/:id').get(protect, getOrder);

//Pay : update order status afer paid
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);
export default orderRouter;
