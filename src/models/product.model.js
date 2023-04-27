const connect = require('./db/connection');

const getAll = () => {
  const [result] = connect.execute('SELECT * FROM products');
  return result;
};

module.exports = {
  getAll,
};