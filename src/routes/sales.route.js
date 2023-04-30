const { Router } = require('express');
const { salesController } = require('../controllers');
const { productIdValidation, quantityValidation } = require('../middlewares/validationSales');

const router = Router();

router.get('/:id', salesController.getSalesById);
router.delete('/:id', salesController.deleteSales);
router.put('/:id', quantityValidation, productIdValidation, salesController.updateSales);
router.post('/', quantityValidation, productIdValidation, salesController.insertSales);
router.get('/', salesController.getAllSales);

module.exports = router;