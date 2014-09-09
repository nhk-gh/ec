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
  date:{                  // when recipe added to site
    type: Date,
    date: Date.now
  },
  notes: [String],        // additional notes about recipe
  rating: Number,
  ratings: Number,
  viewed: Number
});

module.exports = mongoose.model('Recipe', RecipeSchema);