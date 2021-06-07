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
        authorId,
        views: 0
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
    const {userid} = req.body
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
    blog.views += 1
    try {
        await blog.save()
    } catch (err) {
        const error = new HttpError('Something went Wrong,cannot save', 500)
        return next(error)
    }
    let user
    let isbookmarked = false
    let isliked = false
    if(userid) {
        try{
            user = await User.findById(userid)
        } catch (err) {
            console.log(err)
            const error = new HttpError('this error', 500)
            return next(error)
        }
    }
    if(user) {
        isbookmarked = user.bookmarks.includes(blogId)
        isliked = user.liked.includes(blogId)       
    }
    let authorId = blog.authorId
    let author
    try{
        author = await User.findById(authorId)
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!author || author.length === 0) {
        return next(new HttpError('Cound not find the blog'))
    }
    author.views += 1
    try {
        await author.save()
    } catch (err) {
        const error = new HttpError('Something went Wrong,cannot save', 500)
        return next(error)
    }
    res.json({ blog: blog.toObject({ getters: true }), isbookmarked:isbookmarked, isliked: isliked})
}

const fetchQueriedBlog = async (req, res, next) => {
    const query = req.params.query
    let blogs
    try {
        blogs = await Blog.find()
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!blogs || blogs.length === 0) {
        return next(new HttpError('Cound not find any blogs'))
    }
    let filteredblog = blogs.filter(blog => {
        if (blog.blog[0].content.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        // if (blog.description.includes(searchText)) {
        //     return true;
        // }
        return false;
    });
    console.log(filteredblog)
    res.status(200).json({ filteredblog: filteredblog.map(b => b.toObject({ getters: true })) })
}

exports.publishBlog = publishBlog
exports.fetchAllBlogs = fetchAllBlogs
exports.fetchParticularBlog = fetchParticularBlog
exports.fetchQueriedBlog = fetchQueriedBlog
