const router = require('express').Router()
const { body } = require('express-validator')

const {
  getCurrentUserProfile,
  createProfile,
  updateProfile,
  getProfiles,
  getProfileByUserId,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getRepos,
} = require('../controllers/profileController')
const auth = require('../middlewares/auth')

router.route('/me').get(auth, getCurrentUserProfile)

router
  .route('/')
  .post(
    body('status').not().isEmpty().withMessage('Status harus diisi'),
    body('skills').not().isEmpty().withMessage('Skills harus diisi'),
    auth,
    createProfile
  )
  .put(
    body('status').not().isEmpty().withMessage('Status harus diisi'),
    body('skills').not().isEmpty().withMessage('Skills harus diisi'),
    auth,
    updateProfile
  )
  .get(getProfiles)
  .delete(auth, deleteProfile)

router.route('/:userId').get(getProfileByUserId)

router
  .route('/experiences')
  .post(
    body('title').not().isEmpty().withMessage('Job desk harus diisi'),
    body('company').not().isEmpty().withMessage('Perusahaan harus diisi'),
    body('from').not().isEmpty().withMessage('Tanggal mulai kerja harus diisi'),
    auth,
    addExperience
  )

router.route('/experiences/:experienceId').delete(auth, deleteExperience)

router
  .route('/educations')
  .post(
    body('school').not().isEmpty().withMessage('Sekolah harus diisi'),
    body('from')
      .not()
      .isEmpty()
      .withMessage('Tanggal mulai sekolah/kuliah harus diisi'),
    auth,
    addEducation
  )

router.route('/educations/:educationId').delete(auth, deleteEducation)

router.route('/github/:username').get(getRepos)

module.exports = router
