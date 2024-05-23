const express = require('express');
const ownerModel = require('../models/ownerModel');
const ownerRouter = express.Router()

if(process.env.NODE_ENV === 'development'){
    ownerRouter.post('/create', async (req, res) => {
        const owners = await ownerModel.find()
        if (owners.length > 0){
            return res.send(503).send('You dont have permission to create new owner.')
        }

        const { fullname, email, password } = req.body
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })

        res.status(201).send(createdOwner)
    })
}

ownerRouter.get('/', (req, res) => {
    res.send("Welcome owner.")
});

module.exports = ownerRouter;