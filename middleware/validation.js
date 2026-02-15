const { body } = require('express-validator');

const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt().withMessage('Stock must be an integer'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('rating').isNumeric().withMessage('Rating must be a number')
];

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('oauthId').optional().isString().withMessage('OAuth ID must be a string'),
    body('avatar').optional().isString().withMessage('Avatar must be a string'),
    body('role').optional().isString().withMessage('Role must be a string')
];

const validateOrder = [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
    body('status').notEmpty().withMessage('Status is required')
];

const validateReview = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('userId').notEmpty().withMessage('User ID is required'),
    body('rating').isNumeric().withMessage('Rating must be a number'),
    body('comment').isString().notEmpty().withMessage('Comment is required')
];

module.exports = {
    validateProduct,
    validateUser,
    validateOrder,
    validateReview
};
