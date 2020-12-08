import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser'; // to parse cookies from incoming requests
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import appError from './utils/appError.js';
import errorCtrl from './middleware/errorCtrl.js';
dotenv.config();

const app = express();
// initiate morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// handling form and json data
app.use(express.json());
app.use(cookieParser());

// Api Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

// paypal config route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

// All urls that are not defined
app.all('*', (req, res, next) => {
  next(new appError(`Cannot find ${req.originalUrl} on the server`, 404));
});
app.use(errorCtrl);
export default app;
