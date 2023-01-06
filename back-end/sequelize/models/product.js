'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {foreignKey:'categoryId', onDelete:'CASCADE'})
      this.hasMany(models.ProductPicture, {foreignKey:'productId'})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    oldPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    sale: DataTypes.BOOLEAN,
    avaliable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: false
  });
  return Product;
};