'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/recipes', {
        templateUrl: 'app/recipes/recipes.html',
        controller: 'RecipesCtrl'
      })
      .when('/recipes/:search', {
        //search
        templateUrl: 'app/recipes/recipes.html',
        controller: 'RecipesCtrl'
      })
      .when('/recipes/:searchmode/search/:search', {
        //in my fridge
        templateUrl: function(params){
          return  'app/recipes/recipes.html';
        },
        controller: 'RecipesCtrl'
      });
  });