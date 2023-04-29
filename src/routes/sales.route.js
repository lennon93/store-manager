const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.post('/', salesController.insertSales);
router.get('/', salesController.getAllSales);

module.exports = router;