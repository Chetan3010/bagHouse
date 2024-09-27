const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

const app = express()
const db = require('./config/mongoConnection')

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SECRET
    })
)
app.use(flash())

const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const indexRouter = require('./routes/indexRouter')

app.use('/owners', ownerRouter)
app.use('/products', productRouter)
app.use('/account', userRouter)
app.use('/', indexRouter)

app.listen(3007, () => {
    console.log('BagHouse is running!');
})