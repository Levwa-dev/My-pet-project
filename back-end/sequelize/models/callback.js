'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallBack extends Model {
    static associate(models) {
    }
  }
  CallBack.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    number: DataTypes.STRING,
    call: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CallBack',
    tableName: 'call_back',
    timestamps: false
  });
  return CallBack;
};