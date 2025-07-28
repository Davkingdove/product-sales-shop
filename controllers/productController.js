const { Product, ProductImage } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [ProductImage],
      order: [['createdAt', 'DESC']]
    });
    res.render('index', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.renderNewProductForm = (req, res) => {
  res.render('product-form', { product: null, title: 'Create Product' });
};

exports.renderEditProductForm = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [ProductImage]
    });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('product-form', { product, title: 'Edit Product' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price: parseFloat(price) });
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file =>
        ProductImage.create({
          productId: product.id,
          filename: file.filename,
          originalName: file.originalname
        })
      );
      await Promise.all(imagePromises);
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    await Product.update(
      { name, price: parseFloat(price) },
      { where: { id: req.params.id } }
    );
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file =>
        ProductImage.create({
          productId: req.params.id,
          filename: file.filename,
          originalName: file.originalname
        })
      );
      await Promise.all(imagePromises);
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await ProductImage.findByPk(req.params.id);
    if (image) {
      await image.destroy();
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
