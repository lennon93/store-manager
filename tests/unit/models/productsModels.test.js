const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const { products, productById } = require('../../mocks/productsMocks');

describe('Testes de unidade do model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.getAll();
    
    expect(result).to.be.deep.equal(products);
  });
  it('Buscando produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);
    const productId = 1;
    const result = await productModel.getById(productId);

    expect(result).to.be.deep.equal(productById);
  });
});