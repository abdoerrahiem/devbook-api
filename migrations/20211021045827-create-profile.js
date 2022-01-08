'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      company: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      bio: {
        type: Sequelize.STRING,
      },
      githubusername: {
        type: Sequelize.STRING,
      },
      youtube: {
        type: Sequelize.STRING,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      linkedin: {
        type: Sequelize.STRING,
      },
      instagram: {
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
    await queryInterface.dropTable('Profiles')
  },
}
