const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = require('./app');
const server = app.listen(port);
