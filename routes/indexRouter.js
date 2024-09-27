const { isAuthenticated } = require("../middlewares/isAuthenticated")

const express = require('express')
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
    try {
        let error = req.flash('error')
        let success = req.flash('success')
        res.render('index', { error, success, isAuthenticated: false })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/')
    }
})

indexRouter.get('/addtocart/:productid', isAuthenticated, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        user.cart.push(req.params.productid)
        await user.save()
        req.flash('success', 'Product added to cart.')
        res.redirect('/shop')
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/shop')
    }
})

indexRouter.get('/shop', isAuthenticated, async (req, res) => {
    try {
        const products = await productModel.find()
        let error = req.flash('error')
        let success = req.flash('success')
        res.render('shop', { products, error, success })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/shop')
    }
})

indexRouter.get('/cart', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).populate('cart');
        const cartItems = user.cart;

        const groupedItems = {};
        let totalMRP = 0;
        let discount = 0;
        let platformFee = 20;
        let shippingFee = 0; // Assuming free shipping

        cartItems.forEach(item => {
            const productId = item._id;
            const productPrice = item.price;

            // If product not already added, add it to groupedItems
            if (!groupedItems[productId]) {
                // Convert image buffer to base64 string
                const image = item.image
                    ? `data:image/jpeg;base64,${item.image.toString('base64')}`
                    : null;

                groupedItems[productId] = {
                    ...item.toObject(),
                    image, // Use base64 image string
                    quantity: 1
                };
            } else {
                groupedItems[productId].quantity += 1;
            }

            // Calculate the total MRP and discount
            totalMRP += productPrice;
            discount += (productPrice * item.discount) / 100;
        });

        const netTotal = totalMRP - discount + platformFee + shippingFee;

        res.render('cart', {
            products: Object.values(groupedItems),
            totalMRP,
            discount,
            platformFee,
            shippingFee,
            netTotal
        });
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/cart');
    }
});

// Increment product quantity in the cart
indexRouter.get('/cart/increment/:productId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart.push(productId);

        // Save the updated cart
        await user.save();

        // Redirect to cart page
        res.redirect('/cart');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/cart');
    }
});

// Decrement product quantity or remove from cart
indexRouter.get('/cart/decrement/:productId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove the product from the cart if it exists
        const cartIndex = user.cart.findIndex(item => item.equals(productId));
        if (cartIndex !== -1) {
            user.cart.splice(cartIndex, 1);
        }

        // Save the updated cart
        await user.save();

        // Redirect to cart page
        res.redirect('/cart');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/cart');
    }
});


module.exports = indexRouter;