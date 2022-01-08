'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Profile, {
        foreignKey: 'profileId',
      })
    }
  }
  Education.init(
    {
      profileId: DataTypes.INTEGER,
      school: DataTypes.STRING,
      degree: DataTypes.STRING,
      fieldofstudy: DataTypes.STRING,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      current: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Education',
    }
  )
  return Education
}
