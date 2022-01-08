const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const { DataTypes } = require('sequelize')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const { sequelize } = require('../utils/database')

// Register user
exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, password } = req.body

  let user = await User.findOne({
    where: { email },
  })

  if (user)
    return res.status(400).json({ errors: [{ msg: 'Email telah digunakan' }] })

  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }, true)

  const newPassword = await bcrypt.hash(password, 10)

  user = await User.create({
    name,
    email,
    password: newPassword,
    avatar,
  })

  const payload = { user: { id: user.id } }

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '2hr' },
    (err, token) => {
      if (err) throw err

      res.json({ token })
    }
  )
})

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body

  let user = await User.findOne({
    where: { email },
  })

  if (!user)
    return res.status(404).json({ errors: [{ msg: 'User tidak ditemukan' }] })

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched)
    res
      .status(404)
      .json({ errors: [{ msg: 'Password yang anda masukkan salah' }] })

  const payload = { user: { id: user.id } }

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '2hr' },
    (err, token) => {
      if (err) throw err

      res.json({ token })
    }
  )
})

// Get current user
exports.getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ user: req.user })
})
