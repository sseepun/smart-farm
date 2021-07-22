const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const UserDetail = mongoose.model(
  'user_detail',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    prefix: String,
    firstname: String,
    lastname: String,
    phone: String,
    address: String,
    province: String,
    zipcode: String
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = UserDetail;