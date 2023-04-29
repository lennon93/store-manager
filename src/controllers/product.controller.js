const { productService } = require('../services');

const getAll = async (req, res) => {
  const { message } = await productService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  
  if (type) return res.status(404).json(message);
  
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => { 
  const { name } = req.body;
  const result = await productService.insertProduct(name);

  return res.status(201).json({ id: result, name });
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productService.updateProduct(id, name);

  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};
 
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(404).json(message);

  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
};