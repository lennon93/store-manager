const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const { allSales, salesById } = require('../../mocks/salesMock');

describe('Testes de unidade do model de Sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de Sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesModel.getAllSales();

    expect(result).to.be.deep.equal(allSales);
  });
  it('Buscando sales pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[salesById]]);
    const saleId = 1;
    const result = await salesModel.getSalesById(saleId);

    expect(result).to.be.deep.equal(salesById);
  });
  it('Adicionando uma nova sale', async function () {
    sinon.stub(connection, 'execute').resolves();
   
    const result = await salesModel.insertSales();

    expect(result).to.equal();
  });
  it('Adicionando uma nova sale_product', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.insertSalesProducts();

    expect(result).to.equal();
  });

});