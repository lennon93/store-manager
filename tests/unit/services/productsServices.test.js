const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const {
  products, productResearched, newProductMock, notFound,
  correctId, incorrectId, newProduct, updatedProduct,
} = require('../../mocks/productsMocks');

describe('Testes de unidade do service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'getAll').resolves(products);
    const result = await productService.getAll();

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });
  it('Buscando produto pelo id', async function () {
    sinon.stub(productModel, 'getById').resolves(productResearched);
    const result = await productService.getById(correctId);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(productResearched);
  });
  it('Buscando produto por um Id inválido', async function () {
    sinon.stub(productModel, 'getById').resolves();
    const result = await productService.getById(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
  it('Adiciona novo produto', async function () {
    sinon.stub(productModel, 'insertProduct').resolves(newProductMock);
    const result = await productService.insertProduct(newProduct);

    expect(result.id).to.equal(42);
  });
  it('Deleta um produto', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves([{ affectedRows: 1 }]);
    const result = await productService.deleteProduct(correctId);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(null);
  });
  it('Deleta produto com um Id inválido', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves();
    const result = await productService.deleteProduct(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
  it('Update em um produto', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(1);
    const result = await productService.updateProduct(correctId, newProduct);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(updatedProduct);
  });
  it('Update em um produto com um Id inválido', async function () {
    sinon.stub(productModel, 'updateProduct').resolves();
    const result = await productService.updateProduct(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
  it('Buscando produto pelo nome', async function () {
    sinon.stub(productModel, 'searchProduct').resolves(productResearched);
    const searchName = 'Martelo';
    const result = await productService.searchProduct(searchName);

    expect(result).to.be.deep.equal([productResearched]);
  });
});