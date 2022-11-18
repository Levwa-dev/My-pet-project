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
      this.hasMany(models.OrderProduct, {foreignKey:'orderInfoId', onDelete:'CASCADE'})
      this.hasMany(models.InBox, {foreignKey:'orderInfoId', onDelete:"CASCADE"})
    }
  }
  OrderInfo.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    telephone: DataTypes.STRING,
    street: DataTypes.STRING,
    building: DataTypes.STRING,
    sector: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    orderNumber: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderInfo',
    tableName: 'order_info',
    timestamps: false
  });
  return OrderInfo;
};