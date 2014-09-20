/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var fs = require("fs");
var _ = require('lodash');
var Recipe = require('./recipe.model');
var mongoose = require('mongoose');

// Get list of recipes
exports.index = function(req, res) {
  //console.log(req.query.search);
  var options = {};
  if ( req.query.newOnly === 'true') {
    options = { 'approved': false };
  } else {
    options = { 'approved': true };
  }

  if (req.query.search === ''){
    Recipe.find(options, function (err, rcps) {
      if(err) { return handleError(res, err); }
      return res.json(200, rcps);
    });
  } else {
    var regx = new RegExp(req.query.search,'i');
    Recipe.find(options)
      .or([{'name': { $regex: regx }}, {'cousine': { $regex: regx }},
           {'category.name': { $regex: regx }}, {'ingredients.name': { $regex: regx }}])
      .exec(function (err, rcps) {
        if(err) { return handleError(res, err); }
        return res.json(200, rcps);
    });
  }
};

// Get a single recipe
exports.show = function(req, res) {
  var idd = mongoose.Types.ObjectId (req.params.id);
    Recipe.findById(idd, function (err, rcp) {
      if(err) { return handleError(res, err); }
      if(!rcp) { return res.send(404); }
      //return res.json(rcp);
      rcp.viewed += 1;

      rcp.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, rcp);
      });
    });

};

// Creates a new recipe in the DB.
exports.create = function(req, res) {
 /* var recipe = _.cloneDeep(req.body.recipe);

  console.log(req.body);
  console.log(req.files);
  console.log(req.query);
  console.log(req.params);

  for (var i=0; i< recipe.instructions.length; i++) {
    if (recipe.instructions[i].file){
      delete req.body.recipe.instructions[i].file;
    }
  }

  var SaveImageFile = function(id){
    for (var i=0; i< recipe.instructions.length; i++) {
      if (recipe.instructions[i].file){

      }
    }

  };

  SaveImageFile(1);

  return res.json(201);   */

  Recipe.create(req.body.recipe, function(err, rcp) {
    console.log(req.body)
    console.log(err)
    if(err) { return handleError(res, err); }

    //SaveImageFile(rcp._id);

    if (rcp.approved === false){
      //send mail to admin/moderator
    }

    return res.json(201, rcp);
  });
};

exports.uploadImages = function(req, res){
  /*console.log(req.body);
  console.log(req.files);
  console.log(req.query);
  console.log(req.params);*/
}

function extend(target) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
};
// Updates an existing recipe in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recipe.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }

    //var updated = _.merge(thing, req.body.recipe);

    var updated = extend(thing, req.body.recipe );

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a recipe from the DB.
exports.destroy = function(req, res) {
  Recipe.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}