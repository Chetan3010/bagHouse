const mongoose = require('mongoose');

const {MONGODB_USERNAME, MONGODB_PASSWORD} = process.env

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.mibuk.mongodb.net/baghouse`);

const db = mongoose.connection;

db.on('error', err => console.log(err))

db.once('connected', () => console.log('Connected to MongoDB'));

db.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = db;