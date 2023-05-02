const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const { allProductsMock, productById } = require('../../mocks/productsMocks');

describe('Testes de unidade do model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);
    const result = await productModel.getAll();
    
    expect(result).to.be.deep.equal(allProductsMock);
  });
  it('Buscando produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);
    const productId = 1;
    const result = await productModel.getById(productId);

    expect(result).to.be.deep.equal(productById);
  });
  it('Adicionando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const newProduct = 'Armadura do Iron Man';
    const result = await productModel.insertProduct(newProduct);

    expect(result).to.equal(42);
  });
  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const idDeleted = 1;
    const result = await productModel.deleteProduct(idDeleted);

    expect(result).to.equal(1);
  });

});