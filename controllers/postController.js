const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')

const { Post, Like, Comment } = require('../models')

exports.createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const post = await Post.create({
    userId: req.user.id,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
  })

  res.json(post)
})

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
  })

  res.json(posts)
})

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  res.json(post)
})

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  if (post.userId !== req.user.id)
    return res.status(401).json({ msg: 'Tidak bisa menghapus post' })

  await post.destroy()

  res.json({ msg: 'Post berhasil dihapus' })
})

exports.likeOrUnlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  const alreadyLiked = await Like.findOne({
    where: {
      postId: post.id,
      userId: req.user.id,
    },
  })

  if (alreadyLiked) {
    await alreadyLiked.destroy()

    res.json({ msg: 'Unlike berhasil' })
  } else {
    await Like.create({
      postId: post.id,
      userId: req.user.id,
    })

    res.json({ msg: 'Like berhasil' })
  }
})

exports.getLikes = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  const likes = await Like.findAll({
    where: { postId: post.id },
  })

  res.json(likes)
})

exports.addCommentPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  await Comment.create({
    postId: post.id,
    userId: req.user.id,
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
  })

  res.json({ msg: 'Komentar berhasil ditambahkan' })
})

exports.getComments = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  const comments = await Comment.findAll({
    where: { postId: post.id },
  })

  res.json(comments)
})

exports.deleteCommentPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
  })

  if (!post) return res.status(404).json({ msg: 'Post tidak ditemukan' })

  const comment = await Comment.findOne({
    where: { id: req.params.commentId, userId: req.user.id },
  })

  if (!comment) return res.status(404).json({ msg: 'Komentar tidak ditemukan' })

  await comment.destroy()

  res.json({ msg: 'Komentar berhasil dihapus' })
})
