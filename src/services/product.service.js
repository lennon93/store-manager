const { productModel } = require('../models');

const getAll = async () => {
  const products = await productModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const products = await productModel.getById(id);

  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: products };
};

module.exports = {
  getAll,
  getById,
};