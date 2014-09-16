'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  name: String,
  category: {name:String},       // snack (appetizer), salad, soup etc.
  cousine: String,
  description: String,    //about recipe
  duration: Number,       // cooking time in minutes
  ingredients: [{
    name: String,
    qtty: String,
    note: String
  }],
  instructions: [{         // how to cook + link to image
    step:String,
    image: String
  }],
  grant: {                // who grant(give) recipe
    name:String,
    image:String
  },
  date: Date,                 // when recipe added to site


  notes: [String],        // additional notes about recipe
  rating: Number,
  voted:[{                // list of voted people
    name: String,            // user.name
    rating: Number           // his rating
  }],
  viewed: Number,
  approved: Boolean
});

module.exports = mongoose.model('Recipe', RecipeSchema);