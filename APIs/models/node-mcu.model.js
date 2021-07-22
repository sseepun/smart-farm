const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const NodeMCU = mongoose.model(
  'node_mcu',
  new mongoose.Schema({
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'farm'
    },
    node_id: String,
    name: String,
    sensors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sensor'
    }],
    devices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'device'
    }],
    created_at: String,
    updated_at: String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = NodeMCU;