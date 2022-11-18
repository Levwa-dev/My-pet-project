'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('product_pictures', [
        {
          picture:'five.jpg',
          productId:1
        },
        {
          picture:'six.jpg',
          productId:1
        },
        {
          picture:'five.jpg',
          productId:2
        },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('product_pictures', null, {});
  }
};
