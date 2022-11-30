'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('order_product', [
      {
        productId: 1,
        name: 'DataTypes.STRING',
        quantity: 2,
        price: 123,
        orderInfoId: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_product', null, {});
  }
};
