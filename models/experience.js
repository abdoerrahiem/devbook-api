'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Experience.belongsTo(models.Profile, {
        foreignKey: 'profileId',
      })
    }
  }
  Experience.init(
    {
      profileId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      from: DataTypes.DATE,
      to: DataTypes.DATE,
      current: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Experience',
    }
  )
  return Experience
}
