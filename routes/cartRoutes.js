const express = require('express');
const router = express.Router();
const redirectIfNotLoggedIn = require('../middlewares/redirectIfNotLoggedIn');
const cartController = require('../controllers/cartController');

router.get('/cart', redirectIfNotLoggedIn, cartController.renderCart);
router.get('/wishlist', redirectIfNotLoggedIn, cartController.renderWishlist);
router.get('/checkout', redirectIfNotLoggedIn, cartController.renderCheckout);
router.post('/checkout', redirectIfNotLoggedIn, cartController.handleCheckout);

module.exports = router;
