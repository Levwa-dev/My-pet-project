'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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