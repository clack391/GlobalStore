const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));


router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        // #swagger.ignore = true
        req.session.user = req.user;
        res.redirect('/');
    });

router.get('/', (req, res) => {
    // #swagger.ignore = true
    const user = req.session.user;
    const username = user ? (user.displayName || user.username) : null;

    let html = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h1>Welcome to GlobalStore API</h1>
            ${username ? `<h3>Hello, ${username}!</h3>` : '<h3>You are currently logged out.</h3>'}
            
            <div style="margin: 20px;">
                ${!username ? '<a href="/login" style="margin: 10px; padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px;">Login with GitHub</a>' : '<a href="/logout" style="margin: 10px; padding: 10px 20px; background: #d9534f; color: white; text-decoration: none; border-radius: 5px;">Logout</a>'}
            </div>

            <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                <h3>Public Resources</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 10px;"><a href="/products" style="color: #007bff; text-decoration: none;">View All Products</a> (Public)</li>
                    <li style="margin: 10px;"><a href="/reviews" style="color: #007bff; text-decoration: none;">View All Reviews</a> (Public)</li>
                    <li style="margin: 10px;"><a href="/api-docs" style="color: #007bff; text-decoration: none;">API Documentation (Swagger)</a></li>
                </ul>
            </div>
        </div>
    `;
    res.send(html);
});


module.exports = router;
