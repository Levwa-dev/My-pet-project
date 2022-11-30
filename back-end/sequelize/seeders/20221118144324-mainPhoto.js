'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('main_photo', [
      {
        photo: 'first.jpg'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('main_photo', null, {});
  }
};
