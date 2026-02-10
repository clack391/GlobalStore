const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
    res.send('Hello World');
});


module.exports = router;
