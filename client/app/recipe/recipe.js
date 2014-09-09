'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/recipe/:id', {
        templateUrl: 'app/recipe/recipe.html',
        controller: 'RecipeCtrl'
      });
  });