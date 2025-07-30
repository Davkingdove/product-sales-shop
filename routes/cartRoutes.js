const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/cart', authMiddleware, cartController.renderCart);
router.get('/wishlist', authMiddleware, cartController.renderWishlist);
router.get('/checkout', authMiddleware, cartController.renderCheckout);
router.post('/checkout', authMiddleware, cartController.handleCheckout);

module.exports = router;
