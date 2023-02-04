'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OrderInfo, {foreignKey:'orderInfoId', onDelete:'CASCADE'})
    }
  }
  OrderProduct.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(10,2)
  }, {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'order_product',
    timestamps: false
  });
  return OrderProduct;
};