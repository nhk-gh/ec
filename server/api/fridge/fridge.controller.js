'use strict';

//var _     = require('lodash');
var async = require('async');

//var Fridge = require('./fridge.model');
var Recipe = require('../recipe/recipe.model');

// Get list of fridges
exports.index = function(req, res) {
  var products = req.query.products.split(',');
  var search = [];

  for (var i=0; i<products.length; i++) {
    var regx = new RegExp(products[i].trim(),'i');
    //var regx = new RegExp('^' + products[i].trim() + '$','i');
    search.push({'ingredients.name': {$regex: regx}});
  }

  async.series([
    function(callback){
      Recipe.find()
       .and(search)
       .exec(function (err, rcps) {
         if(err) { return handleError(res, err); }
          callback(null, rcps);
       });
    },

    function(callback){
      Recipe.find()
        .or(search)
        .exec(function (err, rcps_ingr) {
          if(err) { return handleError(res, err); }
          callback(null, rcps_ingr);
        });
    }],
    function(err, recipes){
      //console.log(recipes);
      if (!err){
        return res.json(200, recipes);
      }
      else{
        console.log(err);
        return res.json(500, err);
      }
    });
};

/*
// Get a single fridge
exports.show = function(req, res) {
  Fridge.findById(req.params.id, function (err, fridge) {
    if(err) { return handleError(res, err); }
    if(!fridge) { return res.send(404); }
    return res.json(fridge);
  });
};

// Creates a new fridge in the DB.
exports.create = function(req, res) {
  Fridge.create(req.body, function(err, fridge) {
    if(err) { return handleError(res, err); }
    return res.json(201, fridge);
  });
};

// Updates an existing fridge in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fridge.findById(req.params.id, function (err, fridge) {
    if (err) { return handleError(res, err); }
    if(!fridge) { return res.send(404); }
    var updated = _.merge(fridge, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, fridge);
    });
  });
};

// Deletes a fridge from the DB.
exports.destroy = function(req, res) {
  Fridge.findById(req.params.id, function (err, fridge) {
    if(err) { return handleError(res, err); }
    if(!fridge) { return res.send(404); }
    fridge.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
*/
function handleError(res, err) {
  return res.send(500, err);
}