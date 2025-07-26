module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define("ProductImage", {
        Image_ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        P_ID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Image_Data: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        Image_Mime: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return ProductImage;
}
