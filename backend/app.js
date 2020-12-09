import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import cookieParser from 'cookie-parser'; // to parse cookies from incoming requests
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import appError from './utils/appError.js';
import errorCtrl from './middleware/errorCtrl.js';
import uploadRouter from './routes/uploadRouter.js';
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
app.use('/api/v1/upload', uploadRouter);

// paypal config route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve(); // to use in es modules
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// All urls that are not defined
app.all('*', (req, res, next) => {
  next(new appError(`Cannot find ${req.originalUrl} on the server`, 404));
});
app.use(errorCtrl);
export default app;
