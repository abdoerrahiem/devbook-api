const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const axios = require('axios')

const { User, Profile, Education } = require('../models')

// Get current user profile
exports.getCurrentUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
    include: [
      { model: User, attributes: ['name', 'email', 'avatar'] },
      { model: Education },
      { model: Experience },
    ],
  })

  if (!profile) return res.status(404).json({ msg: 'Profil tidak ditemukan' })

  res.json(profile)
})

// Create profile
exports.createProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  if (profile) return res.status(400).json({ msg: 'Profil sudah ada' })

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body

  await Profile.create({
    userId: req.user.id,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  })

  res.json({ msg: 'Profil berhasil dibuat' })
})

// Update profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  if (!profile) return res.status(404).json({ msg: 'Profil tidak ditemukan' })

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body

  await Profile.update(
    {
      userId: req.user.id,
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    },
    {
      where: {
        userId: req.user.id,
      },
    }
  )

  res.json({ msg: 'Profil berhasil diperbaharui' })
})

// Get all profiles
exports.getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.findAll({
    include: [{ model: User, attributes: ['name', 'email', 'avatar'] }],
  })

  res.json(profiles)
})

// Get profile by user id
exports.getProfileByUserId = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.params.userId },
    include: [
      { model: User, attributes: ['name', 'email', 'avatar'] },
      { model: Education },
      { model: Experience },
    ],
  })

  if (!profile) return res.status(404).json({ msg: 'Profile tidak ditemukan' })

  res.json(profile)
})

// Remove profile (also user & posts)
exports.deleteProfile = asyncHandler(async (req, res) => {
  await Profile.destroy({ where: { userId: req.user.id } })
  await Post.destroy({ where: { userId: req.user.id } })
  await User.destroy({ where: { id: req.user.id } })

  res.json({ msg: 'User berhasil dihapus' })
})

// Add experience
exports.addExperience = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  if (!profile) return res.status(404).json({ msg: 'Profil tidak ditemukan' })

  const { title, company, location, from, to, current, description } = req.body

  await Experience.create({
    profileId: profile.id,
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  })

  res.json({ msg: 'Pengalaman berhasil ditambahkan' })
})

// Delete experience
exports.deleteExperience = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  const experience = await Experience.findOne({
    where: {
      profileId: profile.id,
      id: req.params.experienceId,
    },
  })

  if (!experience)
    return res.status(404).json({ msg: 'Pengalaman tidak ditemukan' })

  await experience.destroy()

  res.json({ msg: 'Pengalaman berhasil dihapus' })
})

// Add education
exports.addEducation = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  if (!profile) return res.status(404).json({ msg: 'Profil tidak ditemukan' })

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body

  await Education.create({
    profileId: profile.id,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  })

  res.json({ msg: 'Pendidikan berhasil ditambahkan' })
})

// Delete education
exports.deleteEducation = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  })

  const education = await Education.findOne({
    where: {
      profileId: profile.id,
      id: req.params.educationId,
    },
  })

  if (!education)
    return res.status(404).json({ msg: 'Pendidikan tidak ditemukan' })

  await education.destroy()

  res.json({ msg: 'Pendidikan berhasil dihapus' })
})

// Get user repos from github
exports.getRepos = asyncHandler(async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
    )

    res.json(data)
  } catch (error) {
    res.status(404).json({ msg: 'Repo github tidak ditemukan' })
  }
})
