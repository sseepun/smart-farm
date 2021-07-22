const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model');
db.UserDetail = require('./user-detail.model');
db.Farm = require('./farm.model');
db.NodeMCU = require('./node-mcu.model');
db.Sensor = require('./sensor.model');
db.Device = require('./device.model');

module.exports = db;