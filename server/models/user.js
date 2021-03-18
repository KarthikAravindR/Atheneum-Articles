const mongoose = require('mongoose') 
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema

const userSchema = new schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    image: {type: String, required: true},
    blogs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Blog' }]
    // bag: {type: String, required: true},
    // wishlist: {type: String, required: true},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',userSchema)