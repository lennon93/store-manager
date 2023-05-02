const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const {
  allProductsMock, productResearched, newProduct, correctId,
} = require('../../mocks/productsMocks');

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
    sinon.stub(connection, 'execute').resolves([[productResearched]]);
    const result = await productModel.getById(correctId);

    expect(result).to.be.deep.equal(productResearched);
  });
  it('Adicionando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
    const result = await productModel.insertProduct(newProduct);

    expect(result).to.equal(42);
  });
  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.deleteProduct(correctId);

    expect(result).to.equal(1);
  });
  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.updateProduct(correctId, newProduct);

    expect(result).to.equal(1);
  });
  it('Buscando produto pelo nome', async function () {
    sinon.stub(connection, 'execute').resolves([[productResearched]]);
    const searchName = 'Martelo';
    const result = await productModel.searchProduct(searchName);

    expect(result).to.be.deep.equal(productResearched);
  });

});