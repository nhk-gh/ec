'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FridgeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Fridge', FridgeSchema);