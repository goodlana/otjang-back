/* eslint-disable no-unused-vars */

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      buydate: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING
      },
      storage: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'User',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};