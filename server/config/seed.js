/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
/*
var Thing = require('../api/thing/thing.model');


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});
 */

var User = require('../api/user/user.model');
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'Lazy'
  }, function() {
      console.log('finished populating users');
    }
  );
});

var Feature = require('../api/feature/feature.model');

Feature.count(function(err, count){
  if (count === 0) {
    Feature.create({
      name: 'Recipes',
      info: 'A huge number of recipes - delicious, from affordable products, easy to cook.',
      link: '/recipes'
    }, {
      name: 'In my Fridge',
      info: 'Stayed on the job, did not have time to drop into the store ... tell us what products you did you found in the kitchen and we will help you with cooking dinner.',
      link: '/fridge'
    }, {
      name: 'Dinner Party',
      info: 'Waiting for guests - not a problem. Easy Cooking offers menu options for dinner: guests will be amazed, you will be proud.',
      link: '/dinnerparty'
    });
  }
});

var Category = require('../api/category/category.model');

Category.find({}).remove(function() {
  Category.create(
    { name: 'Appetizer' },
    { name: 'BBQ' },
    { name: 'Dessert' },
    { name: 'Salad' },
    { name: 'Soup' },
    { name: 'Sauce' },
    { name: 'Main dish' },
    { name: 'Cake' },
    { name: 'Fish & See food' },
    { name: 'Chicken' },
    { name: 'Beef' },
    { name: 'Lamb' },
    { name: 'Rice' },
    { name: 'Potato' },
    { name: 'Breakfast' },
    { name: 'Lunch' }
  );
});

var Recipe = require('../api/recipe/recipe.model');

//Recipe.find({}).remove(function() {
Feature.count(function(err, count){
  if (count === 0) {
    Recipe.create({
      name: 'Salmon Tartare with Avocado, Olives & Tarragon',
      category: {name:'snack'},
      cousine: 'French',
      description: 'Serve the salmon tartare with crispy flatbread, crackers, or crostini. You could make individual canapés with the tartare, if you prefer.',
      duration: 30,
      ingredients: [
        { name: 'Salmon', qtty: '6 oz', note:'skin removed' },
        { name: 'Tarragon', qtty: '3 sprigs', note: '' },
        { name: 'Scallion', qtty: '2', note: 'thinly sliced' },
        { name: 'Lemon zest', qtty: '1/2 lemon', note: 'thinly sliced' },
        { name: 'Minced Kalamata Olives', qtty: '2 Tbsp', note: '' },
        { name: 'Avocado', qtty: '1/4', note: 'sliced' },
        { name: 'Extra Virgin Olive Oil', qtty: 'to your taste', note: '' },
        { name: 'Flaky Sea Salt', qtty: 'to your taste', note: '' },
        { name: 'Freshly Ground Pepper', qtty: 'to your taste', note: '' }
      ],
      instructions:[
        {step:'Place the salmon in the freezer for about 15 minutes while you prep the rest of the ingredients. '+
          'The fish will be much easier to cut if it is very cold.', image:''},
        {step:'Remove the tarragon leaves from stem and smash into a paste, using mortar and pestle or a mini '+
          'food processor. Combine with about 1 Tbsp. olive oil and reserve.', image:''},
        {step:'Dice  the salmon in ¼ in. or smaller cubes. Combine with sliced scallions and lemon zest in a '+
          'small bowl. Dress with about a ½ tsp. of olive oil, sea salt and pepper, to taste.', image:''},
        {step:'Form the tartare. If using a ring mold, start with the avocado base. Arrange slices of avocado '+
          'to cover the bottom. Sprinkle the avocado with a little lemon juice to avoid discoloration '+
          'and season lightly with salt. Spread the minced olives over the avocado, and top with the '+
          'salmon mixture. I used a squat mason jar, lined with plastic wrap (helps get it out in one '+
          'piece) and turned it upside-down to unmold it, so I worked in reverse, packing the salmon '+
          'in first, then the olives, ending with the avocado. Once you\'ve filled your mold, '+
          'refrigerate for 15 minutes or longer to help it firm up and hold together.',  image:''},
        {step:'Remove ring mold or invert jar onto a plate. Smear the tarragon oil across the plate or serve in '+
          'a spoon to use as a condiment with the tartare.', image:''}
      ],
      grant: {name:'Ilia Krivoruk', image:''},
      date:{ type: Date, date: Date.now },
      notes: '',
      rating: 5,
      ratings: 1,
      viewed: 1
    });
  }
});