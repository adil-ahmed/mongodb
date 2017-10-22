const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MongooseApp');
mongoose.connect('mongodb://localhost:27017/MongooseApp');

module.exports = {mongoose};