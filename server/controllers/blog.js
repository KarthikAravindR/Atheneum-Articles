const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error')
const Blog = require('../models/blog');
const User = require('../models/user');


const publishBlog = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { authorId,username, image, dateposted, minread, blog } = req.body

    const createdBlog = new Blog({
        dateposted,
        minread,
        blog,
        authorname: username,
        authordp: image,
        authorId
    });
    let user;
    try {
        user = await User.findById(authorId);
        console.log(user)
    } catch (err) {
        const error = new HttpError(
            'Publishing the Blog failed, please try again.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        console.log(createdBlog)
        const sess = await mongoose.startSession();
        sess.startTransaction();
        console.log('tried2')
        await createdBlog.save({ session: sess });
        console.log('blog saved')
        user.blogs.push(createdBlog);
        console.log(user)
        await user.save({ session: sess });
        console.log('user saved')
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Publishing the Blog failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({ blog: createdBlog });
}

const fetchAllBlogs = async (req, res, next) => {
    let blog
    try {
        blog = await Blog.find()
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!blog || blog.length === 0) {
        return next(new HttpError('Cound not find any blogs'))
    }
    res.json({ blog: blog.map(b => b.toObject({ getters: true })) })
}

const fetchParticularBlog = async (req, res, next) => {
    const blogId = req.params.id
    let blog
    try{
        blog = await Blog.findById(blogId)
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!blog || blog.length === 0) {
        return next(new HttpError('Cound not find the blog'))
    }
    res.json({ blog: blog.toObject({ getters: true }) })
}

exports.publishBlog = publishBlog
exports.fetchAllBlogs = fetchAllBlogs
exports.fetchParticularBlog = fetchParticularBlog
