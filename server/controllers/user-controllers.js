const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch');

const HttpError = require('../models/http-error')
const User = require('../models/user');
const Blog = require('../models/blog');
const { response } = require('express');

const client = new OAuth2Client('162003935215-rp7i00q4jsf94gdg6afqdtmkbr1ohbmk.apps.googleusercontent.com')

const userSignup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(new HttpError('Field Cannot be empty', 422))
    }
    const { username, email, password, } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Sign up failed,please try again', 500)
        return next(error)
    }
    if (existingUser) {
        const error = new HttpError('User Exists already, Please Log-In Instead', 422)
        return next(error)
    }
    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError('Could not sign-in the user, please try again', 500)
        return next(error)
    }
    const createdUser = new User({
        username,
        email,
        image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        password: hashedPassword,
        blogs: []
    })
    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError('Signing Up failed, please try again', 500)
        return next(error)
    }
    let token
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "super_secret_dont_share", { expiresIn: '7d' })
    } catch (err) {
        const error = new HttpError('Signing Up failed, please try again', 500)
        return next(error)
    }
    res.status(201).json({ userId: createdUser.id, email: createdUser.email, username: createdUser.username, image: createdUser.image, token: token, blogs: createdUser.blogs })
}

const userLogin = async (req, res, next) => {
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Sign up failed,please try again', 500)
        return next(error)
    }
    if (!existingUser) {
        return next(new HttpError('Invalid Credentials, could not log you in', 401))
    }
    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = new HttpError('Could not log you In, please check your credentials and try again', 500)
    }
    if (!isValidPassword) {
        return next(new HttpError('Invalid Credentials, could not log you in', 401))
    }
    let token

    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, "super_secret_dont_share", { expiresIn: '7d' })
    } catch (err) {
        const error = new HttpError('Log In failed, please try again', 500)
        return next(error)
    }
    res.json({ userId: existingUser.id, email: existingUser.email, username: existingUser.username, image: existingUser.image, token: token, blogs: existingUser.blogs })
}

const googleLogin = (req, res, next) => {
    const { tokenId } = req.body
    client.verifyIdToken({ idToken: tokenId, audience: '162003935215-rp7i00q4jsf94gdg6afqdtmkbr1ohbmk.apps.googleusercontent.com' })
    .then(response => {
        const { email_verified, name, email, picture } = response.payload;
        console.log(response.payload)
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    const error = new HttpError('Could not sign-in the user, please try again', 500)
                    return next(error)
                } else {
                    if (user) {
                        let token
                        try {
                            token = jwt.sign({ userId: user.id, email: user.email }, "super_secret_dont_share", { expiresIn: '7d' })
                        } catch (err) {
                            const error = new HttpError('Log In failed, please try again', 500)
                            return next(error)
                        }
                        res.json({ userId: user.id, email: user.email, username: user.username, image: user.image, token: token, blogs: user.blogs })
                    } else {
                            let password = 'socialmediapwd'
                            // let hashedPassword
                            // try {
                                //     hashedPassword = await bcrypt.hash(password, 12)
                                // } catch (err) {
                                    //     const error = new HttpError('Could not sign-in the user, please try again', 500)
                                    //     return next(error)
                                    // }
                                    // consol
                                    // let hashedPassword
                                    //     hashedPassword = bcrypt.hash(password, 12)
                                    const createdUser = new User({
                                        username: name,
                                        email: email,
                                        image: picture,
                                        password: password,
                                        blogs: []
                                    })
                            console.log(createdUser)
                            try {
                                createdUser.save()
                            } catch (err) {
                                const error = new HttpError('Signing Up failed, please try again', 500)
                                return next(error)
                            }
                            let token
                            try {
                                token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "super_secret_dont_share", { expiresIn: '1h' })
                            } catch (err) {
                                const error = new HttpError('Signing Up failed, please try again', 500)
                                return next(error)
                            }
                            res.status(201).json({ userId: createdUser.id, email: createdUser.email, username: createdUser.username, image: createdUser.image, token: token, blogs: createdUser.blogs })
                        }
                    }
                })
            }
        })
}

const facebookLogin = (req, res, next) => {
    const { userId, accessToken } = req.body;
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`
    fetch(urlGraphFacebook, {
        method: 'GET',
    })
    .then(response=> response.json())
    .then(response => {
        const {email,name} = response
        User.findOne({ email }).exec((err, user) => {
            if (err) {
                const error = new HttpError('Could not sign-in the user, please try again', 500)
                return next(error)
            } else {
                if (user) {
                    let token
                    try {
                        token = jwt.sign({ userId: user.id, email: user.email }, "super_secret_dont_share", { expiresIn: '7d' })
                    } catch (err) {
                        const error = new HttpError('Log In failed, please try again', 500)
                        return next(error)
                    }
                    res.json({ userId: user.id, email: user.email, username: user.username, image: user.image, token: token, blogs: user.blogs })
                } else {
                        let password = 'socialmediapwd'
                        // let hashedPassword
                        // try {
                            //     hashedPassword = await bcrypt.hash(password, 12)
                            // } catch (err) {
                                //     const error = new HttpError('Could not sign-in the user, please try again', 500)
                                //     return next(error)
                                // }
                                // consol
                                // let hashedPassword
                                //     hashedPassword = bcrypt.hash(password, 12)
                                const createdUser = new User({
                                    username: name,
                                    email: email,
                                    image: picture,
                                    password: password,
                                    blogs: []
                                })
                        console.log(createdUser)
                        try {
                            createdUser.save()
                        } catch (err) {
                            const error = new HttpError('Signing Up failed, please try again', 500)
                            return next(error)
                        }
                        let token
                        try {
                            token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, "super_secret_dont_share", { expiresIn: '1h' })
                        } catch (err) {
                            const error = new HttpError('Signing Up failed, please try again', 500)
                            return next(error)
                        }
                        res.status(201).json({ userId: createdUser.id, email: createdUser.email, username: createdUser.username, image: createdUser.image, token: token, blogs: createdUser.blogs })
                    }
                }
        })
    })
}
    
exports.userSignup = userSignup
exports.userLogin = userLogin
exports.googleLogin = googleLogin
exports.facebookLogin = facebookLogin
