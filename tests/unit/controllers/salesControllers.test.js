const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesById, allSales, newSales, newSalesMock, newSalesServiceMock } = require('../../mocks/salesMock');

chai.use(sinonChai);

describe('Testes de unidade do controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: allSales });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);

  });
  it('Buscando sales pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: salesById });

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesById);
  });
  it('Id inválido na busca pelo id', async function () {
    const res = {};
    const req = {
      params: { id: 99 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSalesById').resolves(
      { type: 'SALES_NOT_FOUND', message: { message: 'Sale not found' } }
    );

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
  it('Adiciona uma nova sale', async function () {
    const res = {};
    const req = {
      body: newSales,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(newSales);
    sinon.stub(salesService, 'insertSales').resolves(newSalesServiceMock);

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSalesServiceMock);
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
  // it('Id inválido no update da sale', async function () {
  //   const res = {};
  //   const req = {
  //     params: { id: 99 },
  //     body: { name: newProductMock.name },
  //   };

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(salesService, 'updateSales').resolves(
  //     { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } }
  //   );

  //   await salesController.updateSales(req, res);

  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  // });
  it('Deleta uma sale', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const idDeleted = 1;
    sinon.stub(salesService, 'deleteSales').resolves(idDeleted);

    await salesController.deleteSales(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
});