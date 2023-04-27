const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { products, productById } = require('../../mocks/productsMocks');

describe('Testes de unidade do service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'getAll').resolves([products]);
    const result = await productService.getAll();

    expect(result).to.equal(null);
    expect(result).to.be.deep.equal(products);
  });
  it('Buscando produto pelo id', async function () {
    sinon.stub(productModel, 'getById').resolves([productById]);
    const productId = 1;
    const result = await productService.getById(productId);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(productById);
  });
  it('Id inválido', async function () {
    sinon.stub(productModel, 'getById').resolves([]);
    const productIdWrong = 999;
    const result = await productService.getById(productIdWrong);

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message.message).to.be.deep.equal('Product not found');
  });
});