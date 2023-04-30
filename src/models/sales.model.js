const camelize = require('camelize');
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
    'INSERT INTO StoreManager.sales_products ( sale_id, product_id,  quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT P.sale_id, S.date, P.product_id, P.quantity
     FROM StoreManager.sales_products AS P
     INNER JOIN StoreManager.sales AS S
      ON P.sale_id = S.id;`,
  );
  return camelize(result);
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT S.date, P.product_id, P.quantity
     FROM StoreManager.sales_products AS P
      INNER JOIN StoreManager.sales AS S
      ON P.sale_id = S.id
      WHERE sale_id = (?);`, [id],
  );
  return camelize(result);
};

const deleteSales = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  insertSales,
  getAllSales,
  insertSalesProducts,
  getSalesById,
  deleteSales,
};