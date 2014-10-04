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
//var _ = require('lodash');
var Recipe = require('./recipe.model');
var mongoose = require('mongoose');
var rimraf = require('rimraf');
var im = require('imagemagick');

im.identify.path = '/usr/bin/identify';
im.convert.path = '/usr/bin/convert';

// Get list of recipes
exports.index = function(req, res) {
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
  //console.log(req.params);

  Recipe.findById(req.params.id, function (err, rcp) {
    if(err) { return handleError(res, err); }
    if(!rcp) { return res.send(404); }
    //return res.json(rcp);
    rcp.viewed += 1;
    //console.log(rcp)

    rcp.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rcp);
      //console.log(rcp)
    });
  });

};

// Creates a new recipe in the DB.
exports.create = function(req, res) {
  Recipe.create(req.body.recipe, function(err, rcp) {
    if(err) { return handleError(res, err); }

    if (rcp.approved === false){
      //send mail to admin/moderator
    }

    return res.json(201, rcp);
  });
};

var klbLib = require('../../lib/klbLib');
var async = require('async');

var zeroPad = function(num){
// add leading zero - up to 20 instructions
  return  (num < 10) ? ("0" + num) : num;
};

exports.uploadImages = function(req, res){
  var arrPhotos = [];

   Recipe.findById(req.params.id, function (err, rcp) {
    if (err) { return handleError(res, err); }
    if(!rcp) { return res.send(404); }
    /*******************************************************/
    // fill photo array
    if (klbLib.klbIsArray(req.files.files)){
      arrPhotos = req.files.files.map(function(ph){
        return ph;
      });
    }
    else{
      arrPhotos.push(req.files.files);
    }
    if (arrPhotos.length > 0){
      var imgInd = req.body.imageInd.split(',');
      var num = 0;
      async.each(arrPhotos, function(photo, eachIteratorCallback){
        var tmp_path = photo.path; //the temporary location of the photo
        var target_dir = '/home/ubuntu/ec-imgs/' + req.params.id;  // id is recipe id
        //var target_path = target_dir + "/" + zeroPad(num) + "-" + photo.originalname;
        var target_path = target_dir + "/" + zeroPad(imgInd[num]) + "-" + photo.originalname;
        rcp.instructions[imgInd[num]].image = req.params.id + "/" + zeroPad(imgInd[num]) +
                                      "-" + photo.originalname;
        //var p = photo;

        num++;

        async.series([
          function (callback) {
            callback(null);
          },
          //check for target folder and create it if not exists
          function (callback) {
            fs.stat (target_dir, function (err, st) {
              if (err || !st.isDirectory()) {
                //folder do not exists, create it
                fs.mkdir(target_dir, function (err) {
                  if (err ) {
                    if (err.code !== 'EEXIST'){
                      console.log(err);
                      callback(err);
                    }  else {
                      callback(null);
                    }
                  }
                  else
                    callback(null);
                });
              }
              else
                callback(null);
            });
          },
           // folder exists (or created successfully):
          // move the photo from the temporary location to the intended location
          function(callback){
            fs.rename(tmp_path, target_path, function(err) {
              if (err) {
                console.log(err);
                callback(err);
              }
              else
                callback(null);
            });
          },
          //create small img
          function(callback){
            im.convert([target_path, '-resize', '800x800', target_path],
              function(err){
                callback(err);
              });
          },
          //delete temp image from disk
          function(callback){
            fs.unlink(tmp_path, function(err) {
              if (err) {
                console.log("Delete temp image error (1): " + err);
              }
              callback(null);
            })
          }],

          function(err){
            if (!err){
              eachIteratorCallback();
            }
            else{
              console.log(err);
              eachIteratorCallback(err);

            }
          })
      },
      //error function (the third param.) of async.each
      function(err){
        if (!err){
          rcp.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, rcp);
          });
        } else {
          console.log(err);
          return res.json(500);
        }
      });
    }
    /******************************************************/
  });
};

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

    var del_dir = '/home/ubuntu/ec-imgs/' + req.params.id;

    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      rimraf(del_dir, function(err){
        console.log(err);
      });
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}