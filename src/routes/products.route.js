const { Router } = require('express');
const { productController } = require('../controllers');

const router = Router();

router.post('/', productController.insertProduct);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;