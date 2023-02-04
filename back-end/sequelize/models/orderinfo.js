'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderProduct, {foreignKey:'orderInfoId'})
      this.hasMany(models.InBox, {foreignKey:'orderInfoId'})
    }
  }
  OrderInfo.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    telephone: DataTypes.STRING,
    street: DataTypes.STRING,
    building: DataTypes.STRING,
    sector: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    orderNumber: DataTypes.STRING,
    totalPrice: DataTypes.FLOAT,
    comment: DataTypes.TEXT,
    time: DataTypes.STRING,
    deliveryDate: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderInfo',
    tableName: 'order_info',
    timestamps: false
  });
  return OrderInfo;
};