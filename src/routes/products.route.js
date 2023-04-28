const { Router } = require('express');
const { productController } = require('../controllers');
const { nameValidation } = require('../middlewares/validationProduct');

const router = Router();

router.post('/', nameValidation, productController.insertProduct);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;