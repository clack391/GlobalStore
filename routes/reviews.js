const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews');
const validation = require('../middleware/validate');
const { validateReview } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getSingle);

router.post('/', isAuthenticated, validateReview, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Review data',
        required: true,
        schema: {
            productId: '65b4f8a1e4b0a1b2c3d4e5f7',
            userId: '65b4f8a1e4b0a1b2c3d4e5f6',
            rating: 5,
            comment: 'Great product!'
        }
    } */
    reviewsController.createReview(req, res);
});

router.put('/:id', isAuthenticated, validateReview, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Review data',
        required: true,
        schema: {
            productId: '65b4f8a1e4b0a1b2c3d4e5f7',
            userId: '65b4f8a1e4b0a1b2c3d4e5f6',
            rating: 4,
            comment: 'Updated review comment'
        }
    } */
    reviewsController.updateReview(req, res);
});

router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;
