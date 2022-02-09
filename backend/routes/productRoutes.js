const express = require('express');
const router = express.Router();
const {getProducts, getProductById,  deleteProduct, createProduct, updateProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
/* const Product = require('../models/productModel') */

//get all products
router.get('/',protect, getProducts )
router.route('/').post(protect, admin, createProduct)

//get product by id
router.get('/:id', getProductById)
router.route('/:id').delete(protect, admin, deleteProduct)
router.route('/:id').put(protect, admin, updateProduct)

module.exports = router;