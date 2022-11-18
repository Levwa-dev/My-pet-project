'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('product', [
      {
        name: 'QWEr',
        description: 'DataTypes.TEXT',
        picture: 'second.jpg',
        price: 12,
        date: new Date(),
        sale: false,
        categoryId: 1
      },
      {
        name: 'QWEr',
        description: 'DataTypes.TEXT',
        picture: 'third.jpg',
        price: 12,
        date: new Date(),
        sale: false,
        categoryId: 2
      },
      {
        name: 'QWEr',
        description: 'DataTypes.TEXT',
        picture: 'four.jpg',
        price: 12,
        date: new Date(),
        sale: false,
        categoryId: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('product', null, {});
  }
};
