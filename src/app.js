const express = require('express');
const { productRoutes, salesRoutes } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

module.exports = app;