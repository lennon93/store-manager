const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  allSales, salesById, newSales, notFound,
  newSalesServiceMock, correctId, incorrectId,
} = require('../../mocks/salesMock');

describe('Testes de unidade do service de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);
    const result = await salesService.getAllSales();

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allSales);
  });
  it('Buscando vendas pelo id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(salesById);
    const result = await salesService.getSalesById(correctId);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(salesById);
  });
  it('Id inválido na busca', async function () {
    const result = await salesService.getSalesById(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
  it('Adiciona nova venda', async function () {
    const newId = 3;
    sinon.stub(salesModel, 'insertSales').resolves(newId);
    sinon.stub(salesModel, 'insertSalesProducts').resolves(newId);
    const result = await salesService.insertSales(newSales);

    expect(result.id).to.equal(3);
    expect(result.itemsSold).to.be.deep.equal(newSalesServiceMock.itemsSold);
  });
  it('Deleta uma venda', async function () {
    sinon.stub(salesModel, 'deleteSales').resolves([{ affectedRows: 1 }]);
    const result = await salesService.deleteSales(correctId);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(null);
  });
  it('Deleta uma venda com Id inválido', async function () {
    const result = await salesService.deleteSales(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
  it('update em uma venda', async function () {
    sinon.stub(salesModel, 'updateSales').resolves(1);
    const result = await salesService.updateSales(correctId, newSales);

    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal({ saleId: correctId, itemsUpdated: newSales });
  });
  it('Update em uma venda com Id inválido', async function () {
    const result = await salesService.updateSales(incorrectId);

    expect(result.type).to.equal(notFound.type);
    expect(result.message).to.be.deep.equal(notFound.message);
  });
});