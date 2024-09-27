const express = require('express');
const ownerModel = require('../models/ownerModel');
const ownerRouter = express.Router()

if (process.env.NODE_ENV === 'development') {
    ownerRouter.post('/create', async (req, res) => {
        const owners = await ownerModel.find()
        if (owners.length > 0) {
            return res.status(503).send('You dont have permission to create new owner.')
        }

        const { fullname, email, password } = req.body
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })

        req.flash('success', 'Owner created successfully.')
        return res.redirect('/owner/create')
    })
}

ownerRouter.get('/admin', (req, res) => {
    let success = req.flash('success')
    let error = req.flash('error')
    res.render('createproducts', { success , error})
});

module.exports = ownerRouter;