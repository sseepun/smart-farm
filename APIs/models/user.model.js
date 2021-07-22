const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const User = mongoose.model(
  'user',
  new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String,
    status: Boolean,
    is_admin: Boolean,
    detail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserDetail'
    },
    refresh_token: String,
    created_at: String,
    updated_at: String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = User;