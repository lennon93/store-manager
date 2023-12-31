const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  const [notFound] = sales; 
  if (!notFound) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  return { type: null, message: sales };
};

const insertSales = async (products) => {
    const date = new Date();
  const saleId = await salesModel.insertSales(date);
  
  const promises = products.map(async ({ productId, quantity }) => {
    await salesModel.insertSalesProducts(saleId, productId, quantity);
  });

  await Promise.all(promises);

  const result = {
    id: saleId,
    itemsSold: products,
  };

  return result;
};

const deleteSales = async (id) => {
  const result = await salesModel.deleteSales(id);

  if (!result) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };

  return { type: null, message: null };
};

const updateSales = async (saleId, itemsUpdated) => {
  const { type } = await getSalesById(saleId);
  if (type) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  const promises = itemsUpdated.map(async ({ productId, quantity }) => {
    await salesModel.updateSales(saleId, productId, quantity);
  });
  await Promise.all(promises);

  return { type: null, message: { saleId, itemsUpdated } };
};

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  deleteSales,
  updateSales,
};