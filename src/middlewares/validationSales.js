const { productService } = require('../services');

const productIdValidation = async (req, res, next) => {
  const products = req.body;
  const { message } = await productService.getAll();
  
  const notFound = products.some(({ productId }) => {
    const product = message.find(({ id }) => id === productId);
    return !product;
  });
  const isRequired = products.some(({ productId }) => !productId);

  if (isRequired) {
    return res.status(400).json({
      message: '"productId" is required',
    });
  }
  if (notFound) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const products = req.body;
  if (products.some(({ quantity }) => quantity === undefined)) {
    return res.status(400).json({
      message: '"quantity" is required',
    });
  }
  if (products.some(({ quantity }) => quantity < 1)) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  next();
};

module.exports = {
  productIdValidation,
  quantityValidation,
};