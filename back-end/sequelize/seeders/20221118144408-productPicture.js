'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('product_picture', [
        {
          picture:'first.jpeg',
          productId:1
        },
        {
          picture:'second.jpg',
          productId:2
        },
        {
          picture:'first.jpeg',
          productId:2
        },
        {
          picture:'five.jpg',
          productId:3
        },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('product_picture', null, {});
  }
};
