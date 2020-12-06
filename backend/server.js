import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();
/*  Uncaught exception globally: uncaught synchronous code errors */
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception: shuting down');
  process.exit(1); // 0 = success , 1 = uncalled expection
});
import mongoose from 'mongoose';

import app from './app.js';
const port = process.env.PORT || 5000;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(
      `MongoDB Connected: ${conn.connection.host} \nMode: ${process.env.NODE_ENV} Port: ${port}`
        .cyan.underline
    );
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  });
const server = app.listen(port);

/*  Unhandled rejections globally: errors that happens outside express DB etc*/

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection: shuting down');
  server.close(() => {
    process.exit(1); // 0 = success , 1 = uncalled expection
  });
});
