'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MainPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MainPhoto.init({
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MainPhoto',
    tableName: 'main_photo',
    timestamps: false
  });
  return MainPhoto;
};