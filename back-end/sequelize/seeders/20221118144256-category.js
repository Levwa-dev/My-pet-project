'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('category', [
      {
        name: 'Морозиво'
      },
      {
        name: 'Солодощі',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('category', null, {});
  }
};
