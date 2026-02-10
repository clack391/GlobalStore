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
router.post('/', validateProduct, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product data',
        required: true,
        schema: {
            name: 'iPhone 13',
            price: 999.99,
            description: 'The latest iPhone with A15 Bionic chip.',
            category: 'Electronics',
            stock: 50,
            brand: 'Apple',
            rating: 4.8
        }
    } */
    productsController.createProduct(req, res);
});

router.put('/:id', validateProduct, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Product data',
        required: true,
        schema: {
            name: 'iPhone 13',
            price: 999.99,
            description: 'The latest iPhone with A15 Bionic chip.',
            category: 'Electronics',
            stock: 50,
            brand: 'Apple',
            rating: 4.8
        }
    } */
    productsController.updateProduct(req, res);
});
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
