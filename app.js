const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();
const db =  require('./config/mongoConnection');

const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/owner', ownerRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Scatch');
});

app.listen(3000);