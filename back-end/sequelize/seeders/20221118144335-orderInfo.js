'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('order_info', [
      {
        firstName:'Jake',
        lastName:'Salivan',
        patronymic:'Jackovich',
        telephone:'+380671892190',
        street:'qwes',
        building:'dwa',
        sector:2,
        payment:'Готівка',
        orderNumber: new Date(),
        totalPrice: 123,
        comment:'asdwadsdwadsdwa',
        date: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('order_info', null, {});
  }
};
