const allProductsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const productResearched = [  
  {
    id: 1,
    name: "Martelo de Thor"
  }
];

const newProductMock = {
  id: 42,
  name: 'Armadura do Iron Man'
};

const updatedProduct = {
  id: 1,
  name: 'Armadura do Iron Man',
};

const newProduct = 'Armadura do Iron Man';

const correctId = 1;

const incorrectId = 999;

const notFound = { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

module.exports = {
  allProductsMock,
  productResearched,
  newProductMock,
  newProduct,
  correctId,
  incorrectId,
  updatedProduct,
  notFound,
};