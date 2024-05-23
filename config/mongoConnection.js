const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`);

const db = mongoose.connection;

db.on('error', err => console.log(err))

db.once('connected', () => console.log('Connected to MongoDB'));

db.on('disconnected', () => console.log('Disconnected from MongoDB'));

module.exports = db;