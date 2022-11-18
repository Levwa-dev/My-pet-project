'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('category', [
      {
        name: 'Морозиво'
      },
      {
        name: 'Солодощі',
      },
      {
        name: 'Дисерти',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('category', null, {});
  }
};
