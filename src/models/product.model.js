const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return result;
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  ); 
  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const searchProduct = async (name) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?', [name],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};