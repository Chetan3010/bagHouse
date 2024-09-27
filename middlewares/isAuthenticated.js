const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        if (!req.cookies.token) {
            req.flash('error', 'Please log in to your account.')
            return res.redirect('/')
        }

        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')
        if (!user) {
            res.cookie('token', '')
            req.flash('error','Session has been expired, please log in again!')
            return redirect('/')
        }
        req.user = user
        next()

    } catch (error) {
        req.flash('error', 'something went wrong')
        res.redirect('/')
    }
}