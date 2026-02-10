const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const { body } = require('express-validator');
const validation = require('../middleware/validate');

const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt().withMessage('Stock must be an integer'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('rating').isNumeric().withMessage('Rating must be a number')
];

router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', validateProduct, validation.validate, productsController.createProduct);
router.put('/:id', validateProduct, validation.validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
