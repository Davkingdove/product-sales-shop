const { Sequelize, DataTypes } = require('sequelize');

// Database configuration
const sequelize = new Sequelize('product_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Product model
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'products',
  timestamps: true
});

// ProductImage model
const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'product_images',
  timestamps: true
});

// Define associations
Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  onDelete: 'CASCADE'
});

ProductImage.belongsTo(Product, {
  foreignKey: 'productId'
});

module.exports = {
  sequelize,
  Product,
  ProductImage
};