const mongoose = require('mongoose');

const {MONGODB_URL} = process.env

mongoose.connect(`${MONGODB_URL}/baghouse`);

const db = mongoose.connection;

db.on('error', err => console.log(err))

db.once('connected', () => console.log('Connected to MongoDB'));

db.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = db;