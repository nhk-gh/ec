'use strict';

angular.module('ecApp')
  .controller('RecipesCtrl', function ($scope, $routeParams, recipes) {
    $scope.recipes = [];

    var searchCriteria = $routeParams.search ? $routeParams.search : '';

    recipes.getRecipes(searchCriteria)
      .then(function(recipes) {
        $scope.searchCriteria = searchCriteria === '' ? 'All' : searchCriteria;

        $scope.recipes = recipes;
        $scope.recipes.forEach(function(itm){
          itm.rating = itm.rating.toFixed(1);
        });
      },
      function(){

      });
  });
