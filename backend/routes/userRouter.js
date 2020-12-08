import router from 'express';
import {
  loginUser,
  protect,
  logout,
  userSignup,
  updateUserProfile,
} from '../controllers/authCtrl.js';
import {
  getAllUsers,
  getMe,
  getUserProfile,
  getUser,
  deleteUser,
  restrictTo,
  updateUser,
} from '../controllers/usersCtrl.js';
const userRouter = router.Router();

// Get All Users
userRouter
  .route('/')
  .get(protect, restrictTo('admin'), getAllUsers)
  .post(protect, restrictTo('admin'), userSignup);
// userRouter.route('/:id').get(protect, restrictTo('admin'), getUser);
// Login
userRouter.route('/login').post(loginUser);
// Register
userRouter.route('/register').post(userSignup);
// User Profile
userRouter
  .route('/profile')
  .get(protect, getMe, getUserProfile)
  .put(protect, getMe, updateUserProfile);

userRouter
  .route('/:id')
  .get(protect, restrictTo('admin'), getUser)
  .delete(protect, restrictTo('admin'), deleteUser)
  .put(protect, restrictTo('admin'), updateUser);

export default userRouter;
