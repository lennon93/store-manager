const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const {
  allProductsMock, productResearched, newProductMock, notFound,
  correctId, incorrectId, updatedProduct,
} = require('../../mocks/productsMocks');

chai.use(sinonChai);

describe('Testes de unidade do controller de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getAll').resolves({ type: null, message: allProductsMock });

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock);
    
  });
  it('Buscando produto pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getById').resolves({ type: null, message: productResearched });

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productResearched);
  });
  it('Id inválido', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getById').resolves(notFound);

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
  });
  it('Adiciona um novo produto', async function () {
    const res = {};
    const req = {
      body: { name: newProductMock.name },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'insertProduct').resolves(newProductMock.id);

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });
  it('Update em um novo produto', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
      body: { name: updatedProduct.name },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct').resolves(
      { type: null, message: updatedProduct }
    );

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProduct);
  });
  it('Id inválido no update do produto', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
      body: { name: newProductMock.name },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct').resolves(notFound);

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
  });
  it('Deleta um produto', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct').resolves(correctId);

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
  it('Id inválido para deletar um produto', async function () {
    const res = {};
    const req = {
      params: { id: incorrectId },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteProduct').resolves(notFound);

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
  });
  it('Buscando produto pelo nome', async function () {
    const res = {};
    const req = {
      query: { q: 'Martelo' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'searchProduct').resolves(productResearched);

    await productController.searchProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productResearched);
  });
});