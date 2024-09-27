const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            req.flash('error','You already have an account!')
            return res.redirect('/')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await userModel.create({
            email,
            fullname,
            password: hashedPassword
        })

        req.flash('success','User created successfully. Log in to your account.')
        return res.redirect('/')
    } catch (error) {
        req.flash('error', 'something went wrong')
        res.redirect('/')
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) { 
            req.flash('error', 'Email or Password is incorrect!')
            return res.redirect('/')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            req.flash('error', 'Email or Password is incorrect!')
            return res.redirect('/')
        }

        const token = generateToken(user)

        res.cookie('token', token)
        res.redirect('/shop')
    } catch (error) {
        req.flash('error', 'something went wrong')
        res.redirect('/')
    }
}

module.exports.logout =  (req, res) => {
    res.cookie('token', '')
    res.redirect('/')
}