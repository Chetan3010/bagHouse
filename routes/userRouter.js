const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/authControllers');

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send("Welcome user.")
});

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

userRouter.get('/logout', logout)

module.exports = userRouter;