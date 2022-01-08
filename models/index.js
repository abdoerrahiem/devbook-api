'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const User = require('./user')
const Post = require('./post')
const Like = require('./like')
const Comment = require('./comment')
const Profile = require('./profile')
const Education = require('./education')
const Experience = require('./experience')

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     )
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })

db.User = User(sequelize, Sequelize.DataTypes)
db.Post = Post(sequelize, Sequelize.DataTypes)
db.Like = Like(sequelize, Sequelize.DataTypes)
db.Comment = Comment(sequelize, Sequelize.DataTypes)
db.Profile = Profile(sequelize, Sequelize.DataTypes)
db.Education = Education(sequelize, Sequelize.DataTypes)
db.Experience = Experience(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
