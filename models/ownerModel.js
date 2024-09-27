const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
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
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String,
})

module.exports = mongoose.model('Owner', ownerSchema, 'owner')