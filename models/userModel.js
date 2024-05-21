const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    orders: {
        type: Array,
        default: [],
    },
    contact: {
        type: Number, 
        required: true,
    },
    picture: String
})

module.exports = mongoose.model('User', userSchema, 'user');