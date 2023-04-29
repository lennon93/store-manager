const { Router } = require('express');
const { salesController } = require('../controllers');
const { productIdValidation, quantityValidation } = require('../middlewares/validationSales');

const router = Router();

router.post('/', quantityValidation, productIdValidation, salesController.insertSales);
router.get('/:id', salesController.getSalesById);
router.get('/', salesController.getAllSales);

module.exports = router;