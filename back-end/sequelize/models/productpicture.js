'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductPicture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {foreignKey:'productId', onDelete:'CASCADE'})
    }
  }
  ProductPicture.init({
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductPicture',
    tableName: 'product_picture',
    timestamps: false
  });
  return ProductPicture;
};