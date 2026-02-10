const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
    swaggerDocument.host = req.get('host');
    // #swagger.ignore = true
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

module.exports = router;
