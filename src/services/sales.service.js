const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const insertSales = async (products) => {
    const date = new Date();
  const id = await salesModel.insertSales(date);
  
  const promises = products.map(async ({ productId, quantity }) => {
    await salesModel.insertSalesProducts(id, productId, quantity);
  });

  await Promise.all(promises);

  const result = id;
  return result;
};

module.exports = {
  insertSales,
  getAllSales,
};