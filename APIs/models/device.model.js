const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Device = mongoose.model(
  'device',
  new mongoose.Schema({
    node: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'node_mcu'
    },
    type: String,
    name: String,
    created_at: String,
    updated_at: String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Device;