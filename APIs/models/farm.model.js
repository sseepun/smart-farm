const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Farm = mongoose.model(
  'farm',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    name: String,
    description: String,
    created_at: String,
    updated_at: String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Farm;