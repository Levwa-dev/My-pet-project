'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('call_back', [{
        firstName : 'Jack',
        lastName: 'Sparrow',
        patronymic: 'Alfred',
        number:'+380667270180',
        call:'Позвонить',
        date: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('call_back', null, {});
  }
};
