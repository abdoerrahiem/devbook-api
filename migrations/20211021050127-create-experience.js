'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      from: {
        type: Sequelize.DATE,
      },
      to: {
        type: Sequelize.DATE,
      },
      current: {
        type: Sequelize.BOOLEAN,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Experiences')
  },
}
