'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('in_box', [
      {
        boxName: 'DataTypes.STRING',
        boxId: 1,
        productName: 'DataTypes.STRING',
        productId: 2,
        orderInfoId:1
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('in_box', null, {});
  }
};
