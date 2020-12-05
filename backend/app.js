const express = require('express');
const morgan = require('morgan');

const app = express();
// initiate morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log(process.env.NODE_ENV);
// handling form and json data
app.use(express.json());
// Api Routes
app.use('/api/v1/products', require('./routes/productRouter'));

module.exports = app;
