allSales = [
  {
    "saleId": 1,
    "date": "2023-04-30T17:26:00.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-30T17:26:00.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-30T17:26:00.000Z",
    "productId": 3,
    "quantity": 15
  }
];

salesById = [
  {
    "date": "2023-04-30T17:26:00.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-04-30T17:26:00.000Z",
    "productId": 2,
    "quantity": 10
  }
];

newSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

newSalesMock = [
  {
    "saleId": 3,
    "productId": 1,
    "quantity": 1
  },
  {
    "saleId": 3,
    "productId": 2,
    "quantity": 5
  }
];

newSalesServiceMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  allSales,
  salesById,
  newSales,
  newSalesMock,
  newSalesServiceMock,
};