const express = require('express');

// JWT Token checker middleware
const authCheck = require('../middlewares/check-auth');

// File uploader middleware
const upload = require('../middlewares/storage');

// Product Controller
const productController = require('../controllers/productController');


const router = express.Router(); // istance of a new specific router

// SHOW ALL PRODUCT
router.get('/', productController.get_all_products);

// UPLOAD AN ITEM
router.post('/', authCheck, upload.single('productImage'), productController.insert_product);

// GET ITEM DETAIL
router.get('/:productId', productController.get_product_detail);

// UPDATE AN ITEM
router.patch('/:productId', authCheck, productController.update_product);

// DELETE AN ITEM
router.delete('/:productId', authCheck, productController.delete_product);

module.exports = router;