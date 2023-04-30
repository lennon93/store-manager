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

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSales(id);

  if (type) return res.status(404).json(message);

  return res.status(204).json();
};

const updateSales = async (req, res) => {
  const itemsUpdated = req.body;
  const { id } = req.params;
  const { type, message } = await salesService.updateSales(id, itemsUpdated);

  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

module.exports = {
  insertSales,
  getAllSales,
  getSalesById,
  deleteSales,
  updateSales,
};