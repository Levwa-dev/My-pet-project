'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('videos', [
      {
        description: 'ідвлптушкжаьівжаоцужатсві',
        video: 'test.mp4'
     }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('videos', null, {});
  }
};
