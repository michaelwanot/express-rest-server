const express = require('express');

// JWT Token checker middleware
const authCheck = require('../middlewares/check-auth');

// Order Controller
const orderController = require('../controllers/orderController');

// ROUTER ISTANCE
const router = express.Router();

// SHOW ALL ORDERS
router.get('/', orderController.get_all_orders);

// UPLOAD AN ORDER
router.post('/', authCheck, orderController.insert_order);

// GET ORDER DETAIL
router.get('/:orderId', orderController.get_order_detail);

// UPDATE AN ORDER
router.patch('/:orderId', authCheck, orderController.update_order);

// DELETE AN ORDER
router.delete('/:orderId', authCheck, orderController.delete_order);

module.exports = router;
