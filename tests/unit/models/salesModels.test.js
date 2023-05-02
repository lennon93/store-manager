const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');
const {
  allSales, salesById, newSales, newSalesMock, correctId, incorrectId,
} = require('../../mocks/salesMock');

describe('Testes de unidade do model de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Recuperando a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesModel.getAllSales();

    expect(result).to.be.deep.equal(allSales);
  });
  it('Buscando vendas pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([salesById]);
    const result = await salesModel.getSalesById(correctId);

    expect(result).to.be.deep.equal(salesById);
  });
  it('Adicionando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]); 
    const result = await salesModel.insertSales(newSales);

    expect(result).to.equal(3);
  });
  it('Adicionando uma nova venda na tabela sales_products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSalesProducts(newSalesMock);

    expect(result).to.equal(3);
  });
  it('Deletando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await salesModel.deleteSales(correctId);

    expect(result).to.equal(1);
  });
  it('Atualizando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const quantityProduct = 10;
    const result = await salesModel.updateSales(correctId, correctId, quantityProduct);

    expect(result).to.equal(1);
  });
});