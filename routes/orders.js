const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');
const { validateOrder } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getSingle);

router.post('/', isAuthenticated, validateOrder, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Order data',
        required: true,
        schema: {
            userId: '65b4f8a1e4b0a1b2c3d4e5f6',
            productId: '65b4f8a1e4b0a1b2c3d4e5f7',
            quantity: 2,
            status: 'pending'
        }
    } */
    ordersController.createOrder(req, res);
});

router.put('/:id', isAuthenticated, validateOrder, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Order data',
        required: true,
        schema: {
            userId: '65b4f8a1e4b0a1b2c3d4e5f6',
            productId: '65b4f8a1e4b0a1b2c3d4e5f7',
            quantity: 3,
            status: 'shipped'
        }
    } */
    ordersController.updateOrder(req, res);
});

router.delete('/:id', isAuthenticated, ordersController.deleteOrder);

module.exports = router;
