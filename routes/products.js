const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const validation = require('../middleware/validate');
const { validateProduct } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', isAuthenticated, validateProduct, validation.validate, (req, res) => {
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

router.put('/:id', isAuthenticated, validateProduct, validation.validate, (req, res) => {
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
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;
