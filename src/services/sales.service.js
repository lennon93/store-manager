const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const insertSales = async (products) => {
    const date = new Date();
  const saleId = await salesModel.insertSales(date);
  
  const promises = products.map(async ({ productId, quantity }) => {
    await salesModel.insertSalesProducts(saleId, productId, quantity);
  });

  await Promise.all(promises);

  return saleId;
};

module.exports = {
  insertSales,
  getAllSales,
};