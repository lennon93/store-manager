const { salesService } = require('../services');

const insertSales = async (req, res) => {
  const products = req.body;
  const result = await salesService.insertSales(products);

  return res.status(201).json(result);
};

const getAllSales = async (req, res) => {
  const { message } = await salesService.getAllSales();
  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  getAllSales,
};