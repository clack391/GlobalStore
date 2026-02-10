const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

const { body } = require('express-validator');
const validation = require('../middleware/validate');

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('oauthId').notEmpty().withMessage('OAuth ID is required'),
    body('avatar').optional().isString().withMessage('Avatar must be a string'),
    body('role').optional().isString().withMessage('Role must be a string')
];

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validateUser, validation.validate, usersController.createUser);
router.put('/:id', validateUser, validation.validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
