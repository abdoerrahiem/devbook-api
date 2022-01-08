'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      Profile.hasMany(models.Education, { foreignKey: 'profileId' })
      Profile.hasMany(models.Experience, { foreignKey: 'profileId' })
    }
  }
  Profile.init(
    {
      userId: DataTypes.INTEGER,
      company: DataTypes.STRING,
      website: DataTypes.STRING,
      location: DataTypes.STRING,
      status: DataTypes.STRING,
      skills: DataTypes.ARRAY(DataTypes.STRING),
      bio: DataTypes.STRING,
      githubusername: DataTypes.STRING,
      youtube: DataTypes.STRING,
      twitter: DataTypes.STRING,
      facebook: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      instagram: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  )
  return Profile
}
