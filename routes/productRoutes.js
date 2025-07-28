const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const authMiddleware = require('../middlewares/authMiddleware');
// Product routes
router.get('/master', authMiddleware, productController.getAllProducts);
router.get('/product/new', productController.renderNewProductForm);
router.get('/product/:id/edit', productController.renderEditProductForm);
router.post('/product', upload.array('images', 10), productController.createProduct);
router.put('/product/:id', upload.array('images', 10), productController.updateProduct);
router.delete('/image/:id', productController.deleteImage);

module.exports = router;
