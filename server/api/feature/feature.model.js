'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeatureSchema = new Schema({
  name: String,
  info: String,
  link: String
});

module.exports = mongoose.model('Feature', FeatureSchema);