'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InBox extends Model {
   
    static associate(models) {
      this.belongsTo(models.OrderInfo)
    }
  }
  InBox.init({
    boxName: DataTypes.STRING,
    boxId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InBox',
    tableName: 'in_box',
    timestamps: false
  });
  return InBox;
};