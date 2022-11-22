'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
   
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Token.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
    tableName: 'token',
    timestamps: false
  });
  return Token;
};