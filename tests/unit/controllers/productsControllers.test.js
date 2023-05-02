const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { products, productById, newProductMock } = require('../../mocks/productsMocks');

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
  // it('Update em um novo produto', async function () {
  //   const res = {};
  //   const req = {
  //     body: { name: newProductMock.name },
  //     params: { id: 1 },
  //   };
  //   const id = 1;

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(productService, 'updateProduct').resolves(
  //     { type: null, message: { id, name: newProductMock.name } }
  //   );

  //   await productController.updateProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(
  //     { message: { id, name: newProductMock.name } }
  //   );
  // });
  it('Id inválido no update do produto', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
      body: { name: newProductMock.name },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'updateProduct').resolves(
      { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } }
    );

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Deleta um produto', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const idDeleted = 1;
    sinon.stub(productService, 'deleteProduct').resolves(idDeleted);

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
});