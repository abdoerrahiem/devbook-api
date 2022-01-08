const jwt = require('jsonwebtoken')
const { DataTypes } = require('sequelize')
const asyncHandler = require('express-async-handler')

const User = require('../models/user')
const { sequelize } = require('../utils/database')

module.exports = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const { dataValues } = await User(sequelize, DataTypes).findOne({
        where: { id: decoded.user.id },
        attributes: {
          exclude: 'password',
        },
      })

      req.user = dataValues

      next()
    } catch (error) {
      res.status(401).json({ msg: 'Otentikasi ditolak' })
    }
  } else {
    res.status(401).json({ msg: 'Akses ditolak' })
  }
})
