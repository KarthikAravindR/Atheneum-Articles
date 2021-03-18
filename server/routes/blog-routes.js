const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const blogControllers = require('../controllers/blog')

router.post('/blog/new', blogControllers.publishBlog)
router.get('/get/blogs', blogControllers.fetchAllBlogs)
router.get('/blogview/:id', blogControllers.fetchParticularBlog)

module.exports = router