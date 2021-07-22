const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const Sensor = mongoose.model(
  'sensor',
  new mongoose.Schema({
    node: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'node_mcu'
    },
    type: String,
    name: String,
    min: mongoose.Schema.Types.Decimal128,
    max: mongoose.Schema.Types.Decimal128,
    created_at: String,
    updated_at: String,
  }, { timestamps: true }).plugin(sanitizerPlugin)
);

module.exports = Sensor;