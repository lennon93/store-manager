const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { products, productById } = require('../../mocks/productsMocks');

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
    sinon.stub(productService, 'getAll').resolves({ type: null, message: products });

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
    
  });
  it('Buscando produto pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getById').resolves({ type: null, message: productById });

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productById);
  });
  it('Id inválido', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getById').resolves(
      { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } }
    );

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});