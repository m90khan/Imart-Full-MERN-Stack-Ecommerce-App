import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
dotenv.config();

// const productData = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// const userData = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviewsData = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connected`);
  });

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users, { validateBeforeSave: false }); // fails because of password confirm
    // to create adin for all products
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.create(sampleProducts);

    console.log('Data Loaded Successfully');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

// - Delete previous written data from Database
const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data deleted Successfully');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

/*   
node .dev-data/import-dev-data.js --import

console.log(process.argv);

[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\Projects\\NatureTours\\Natures API\\dev-data\\data\\import-dev-data.js',     
  '--import'
]
 
*/
