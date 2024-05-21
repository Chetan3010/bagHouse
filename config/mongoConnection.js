const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scatch');

const db = mongoose.connection;

db.on('error', err => console.error)

db.once('connected', () => console.log('Connected to MongoDB'));

db.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = db;