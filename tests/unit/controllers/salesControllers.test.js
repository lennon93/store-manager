const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const {
  salesById, allSales, newSales, newSalesMock, notFound,
  newSalesServiceMock, correctId, newSalesUpdated, incorrectId,
} = require('../../mocks/salesMock');

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
      params: { id: correctId },
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
      params: { id: incorrectId },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSalesById').resolves(notFound);

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
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
  it('Update uma nova venda', async function () {
    const res = {};
    const req = {
      body: newSales,
      params: { id: correctId },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSales').resolves(
      { type: null, message: newSalesUpdated }
    );

    await salesController.updateSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newSalesUpdated);
  });
  it('Id inválido no update de uma venda', async function () {
    const res = {};
    const req = {
      params: { id: incorrectId },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSales').resolves(notFound);

    await salesController.updateSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
  });
  it('Deleta uma venda', async function () {
    const res = {};
    const req = {
      params: { id: correctId },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSales').resolves(correctId);

    await salesController.deleteSales(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
  it('Id inválido no delete de uma venda', async function () {
    const res = {};
    const req = {
      params: { id: incorrectId },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSales').resolves(notFound);

    await salesController.deleteSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFound.message);
  });
});