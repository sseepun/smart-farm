const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model');
db.UserDetail = require('./user-detail.model');
db.Farm = require('./farm.model');

module.exports = db;