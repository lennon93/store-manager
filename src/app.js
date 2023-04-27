const express = require('express');
const { productRoutes } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;