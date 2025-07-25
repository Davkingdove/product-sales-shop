const db = require("../db.js")
db.Customers = require("./customer.model")(db.sequelize,db.Sequelize);
db.category = require("./category.model")(db.sequelize,db.Sequelize);
db.subCategory = require("./sub.category.model")(db.sequelize,db.Sequelize);
db.orders = require("./order.model")(db.sequelize,db.Sequelize);
db.ordersItems = require("./order.items.model")(db.sequelize,db.Sequelize);
db.Payments = require("./payment.model")(db.sequelize,db.Sequelize);
db.Products = require("./product.model")(db.sequelize,db.Sequelize);
db.discount = require("./discount.model")(db.sequelize,db.Sequelize);
db.discountItems = require("./discount.items.model")(db.sequelize,db.Sequelize);
db.ProductImage = require("./productImage.model.js")(db.sequelize,db.Sequelize);
// Associations 
db.category.hasMany(db.subCategory, {foreignKey: 'Cat_Name'});
db.subCategory.belongsTo(db.category, {foreignKey: 'Cat_Name'});
db.Customers.hasMany(db.orders, {foreignKey: 'C_ID'});
db.orders.belongsTo(db.Customers, {foreignKey: 'C_ID'});
db.orders.hasMany(db.ordersItems, {foreignKey: 'O_ID'});
db.ordersItems.belongsTo(db.orders, {foreignKey: 'O_ID'});
db.orders.hasMany(db.Payments, {foreignKey: 'O_ID'});
db.Payments.belongsTo(db.orders, {foreignKey: 'O_ID'});
db.Products.hasMany(db.ordersItems, {foreignKey: 'P_ID'});
db.ordersItems.belongsTo(db.Products, {foreignKey: 'P_ID'});
db.Products.hasMany(db.discountItems, {foreignKey: 'P_ID'});
db.discountItems.belongsTo(db.Products, {foreignKey: 'P_ID'});
db.discount.hasMany(db.discountItems, {foreignKey: 'D_ID'});
db.discountItems.belongsTo(db.discount, {foreignKey: 'D_ID'});
db.Customers.hasMany(db.Products, {foreignKey: 'C_ID'});
db.Products.belongsTo(db.Customers, {foreignKey: 'C_ID'});
db.subCategory.hasMany(db.Products, {foreignKey: 'SubCat_Name'});
db.Products.belongsTo(db.subCategory, {foreignKey: 'SubCat_Name'});
db.category.hasMany(db.Products, {foreignKey: 'Cat_Name'});
db.Products.belongsTo(db.category, {foreignKey: 'Cat_Name'});
db.Products.hasMany(db.ProductImage, { foreignKey: 'P_ID', as: 'images' });
db.ProductImage.belongsTo(db.Products, { foreignKey: 'P_ID' });
module.exports = db
