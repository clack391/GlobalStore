const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

const validation = require('../middleware/validate');
const { validateUser } = require('../middleware/validation');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validateUser, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
            username: 'johndoe',
            oauthId: 'google-oauth2|1234567890',
            avatar: 'https://example.com/avatar.jpg',
            role: 'user'
        }
    } */
    usersController.createUser(req, res);
});

router.put('/:id', validateUser, validation.validate, (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User data',
        required: true,
        schema: {
            username: 'johndoe',
            oauthId: 'google-oauth2|1234567890',
            avatar: 'https://example.com/avatar.jpg',
            role: 'user'
        }
    } */
    usersController.updateUser(req, res);
});
router.delete('/:id', usersController.deleteUser);

module.exports = router;
