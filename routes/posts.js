const router = require('express').Router()
const { body } = require('express-validator')

const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likeOrUnlikePost,
  addCommentPost,
  deleteCommentPost,
  getComments,
  getLikes,
} = require('../controllers/postController')
const auth = require('../middlewares/auth')

router
  .route('/')
  .post(
    body('text').not().isEmpty().withMessage('Text harus diisi'),
    auth,
    createPost
  )
  .get(getPosts)

router.route('/:id').get(auth, getPost).delete(auth, deletePost)

router.route('/likes/:id').put(auth, likeOrUnlikePost).get(auth, getLikes)

router
  .route('/comments/:id')
  .post(
    body('text').not().isEmpty().withMessage('Komentar harus diisi'),
    auth,
    addCommentPost
  )
  .get(auth, getComments)

router.route('/comments/:id/:commentId').delete(auth, deleteCommentPost)

module.exports = router
