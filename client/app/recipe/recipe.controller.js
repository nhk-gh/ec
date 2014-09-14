'use strict';

angular.module('ecApp')
  .controller('RecipeCtrl', function ($scope, $routeParams, recipe) {
    $scope.recipe = {};
    $scope.ingredients = [];

    recipe.getRecipe($routeParams.id)
      .then(function(recipe) {
        $scope.recipe = recipe;
        recipe.rating = recipe.rating.toFixed(1);
        arrangeIngredients();
        //console.log($scope.recipe)
      },
      function(){

      });

    var arrangeIngredients = function(){
      var middle = Math.ceil($scope.recipe.ingredients.length / 2);
      var mod = $scope.recipe.ingredients.length % 2;
      //console.log(mod)
      for (var i=0; i<middle; i++){
        $scope.ingredients.push($scope.recipe.ingredients[i]);

        if ((i < middle-1) && (mod !== 0)){
          $scope.ingredients.push($scope.recipe.ingredients[i+middle]);
        }
      }

      //console.log($scope.recipe)
    };

    $scope.$on('rate-it', function(evt, args){
      recipe.updateRecipe($scope.recipe, args)
        .then(function(data) {
          data.rating = data.rating.toFixed(1)
          $scope.recipe = data;

          arrangeIngredients();
        },
        function() {

        });
    });
  });
