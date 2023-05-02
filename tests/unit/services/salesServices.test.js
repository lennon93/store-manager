const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesById, allSales, newSales, newSalesMock, newSalesServiceMock } = require('../../mocks/salesMock');

describe('Testes de unidade do service de Sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de Sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);
    const result = await salesService.getAllSales();

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allSales);
  });
  it('Buscando Sales pelo id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesById);
    const saleId = 1;
    const result = await salesService.getSalesById(saleId);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(salesById);
  });
  // it('Id inválido na busca', async function () {
  //   sinon.stub(salesModel, 'getSalesById').resolves();
  //   const saleIdWrong = 999;
  //   const result = await salesService.getSalesById(saleIdWrong);

  //   expect(result.type).to.equal('SALES_NOT_FOUND');
  //   expect(result.message).to.be.deep.equal({ message: 'Sale not found' });
  // });
  // it('Adiciona nova Sale', async function () {
  //   sinon.stub(salesModel, 'insertSales').resolves(newSalesServiceMock);
  //   const result = await salesService.insertSales(newSales);

  //   expect(result.id).to.equal(3);
  //   expect(result.itemsSold).to.be.deep.equal(newSalesServiceMock.itemsSold);
  // });
  it('Deleta uma sale', async function () {
    sinon.stub(salesModel, 'deleteSales').resolves([{ affectedRows: 1 }]);
    const saleId = 1;
    const result = await salesService.deleteSales(saleId);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(null);
  });
});