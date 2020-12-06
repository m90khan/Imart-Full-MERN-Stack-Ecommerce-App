import router from 'express';
import { loginUser, protect, logout, userSignup } from '../controllers/authCtrl.js';
import { getMe, getUserProfile } from '../controllers/usersCtrl.js';
const userRouter = router.Router();
// Login
userRouter.route('/login').post(loginUser);
// User Profile
userRouter.route('/signup').post(userSignup);
// User Profile
userRouter.route('/profile').get(protect, getMe, getUserProfile);
export default userRouter;
