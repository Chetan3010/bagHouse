const express = require('express');

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send("Welcome user.")
});

module.exports = userRouter;