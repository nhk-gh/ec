'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  term: String,
  qtty: Number
});

module.exports = mongoose.model('Request', RequestSchema);