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

const deleteProduct = async (id) => {
  const result = await productModel.deleteProduct(id);

  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: null };
};

const searchProduct = async (q) => {
  const { message } = await getAll();
  const searchName = message
    .filter((product) => product.name.toUpperCase().includes(q.toUpperCase()));

  const names = Object.values(searchName);
  const columns = names.map(({ name }) => name);
  const resultProducts = [];
  const promises = columns.map(
    async (name) => {
      const product = await productModel.searchProduct(name);
      return resultProducts.push(product);
    },
  );

  await Promise.all(promises);

  console.log(resultProducts);

  return resultProducts;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};