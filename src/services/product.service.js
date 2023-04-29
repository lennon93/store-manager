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

const insertProduct = async (productName) => { 
  const result = await productModel.insertProduct(productName);
  return result;
};

const updateProduct = async (id, name) => { 
  const result = await productModel.updateProduct(id, name);

  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: { id, name } };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
};