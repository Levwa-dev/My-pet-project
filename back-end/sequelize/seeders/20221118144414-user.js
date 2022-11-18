'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('user', [
        {
           name: 'Admin',
           email: 'admin.123@gmail.com',
           password: 'Qazwsx123',
           date: new Date(),
           isAdmin: true
        },
        {
          name: 'John Aren',
          email: 'aren.john123@gmail.com',
          password: 'Qazwsx1df23',
          date: new Date(),
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('user', null, {});
  }
};
