const router = require('express').Router()
const { body } = require('express-validator')

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post(
  '/register',
  body('name').not().isEmpty().withMessage('Nama harus diisi'),
  body('email').isEmail().normalizeEmail().withMessage('Email tidak valid'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password harus terdiri dari minimal 5 karakter'),
  registerUser
)

router.post(
  '/login',
  body('email').isEmail().normalizeEmail().withMessage('Email tidak valid'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password harus terdiri dari minimal 5 karakter'),
  loginUser
)

router.get('/', auth, getCurrentUser)

module.exports = router
