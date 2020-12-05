const products = require('../data/products');
exports.getAllProducts = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};
