const connection = require('./db/connection');

const insertSales = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [date],
  );
  return insertId;
};

const insertSalesProducts = async (id, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.sales');
  return result;
};

module.exports = {
  insertSales,
  getAllSales,
  insertSalesProducts,
};