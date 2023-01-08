'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn('in_box', 'price',
        {
          type: Sequelize.INTEGER
        },
        {
          transaction: t
        })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('in_box', 'price', { transaction: t }),
      ]);
    });
  }
};
