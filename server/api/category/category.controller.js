'use strict';

var Category = require('./category.model');

// Get list of features
exports.index = function(req, res) {
  Category.find({},'name', {sort:{name:1}}, function (err, cat) {
    if(err) { return handleError(res, err); }
    return res.json(200, cat);
  });
};

// Creates a new feature in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, cat) {
    if(err) { return handleError(res, err); }
    return res.json(201, cat);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}