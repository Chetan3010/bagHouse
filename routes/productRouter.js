const express = require('express');
const upload = require('../config/multerConfig');
const productModel = require('../models/productModel');

const productRouter = express.Router()

productRouter.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer,
        })

        req.flash('success', "Product created successfully.")
        return res.redirect('/owners/admin')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/owners/admin')
    }
});

module.exports = productRouter;