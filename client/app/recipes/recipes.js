'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/recipes', {
        templateUrl: 'app/recipes/recipes.html',
        controller: 'RecipesCtrl'
      })
      .when('/recipes/:search', {
        templateUrl: 'app/recipes/recipes.html',
        controller: 'RecipesCtrl'
      });
  });