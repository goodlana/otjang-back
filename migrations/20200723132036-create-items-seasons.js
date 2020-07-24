'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items_seasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ItemsId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Items',
          key: 'id'
        }
      },
      SeasonsId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Seasons',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items_seasons');
  }
};