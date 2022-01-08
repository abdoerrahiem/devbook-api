'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      Post.hasMany(models.Like)
      Post.hasMany(models.Comment)
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  )
  return Post
}
