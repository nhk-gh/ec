'use strict';

angular.module('ecApp')
  .controller('RecipeCtrl', function ($scope, $window, $routeParams, recipe, Auth, LIMITS, glossary) {
    $scope.glossary = glossary.getGlossary();

    $scope.recipe = {};
    $scope.ingredients = [];
    $scope.isAdmin = Auth.isAdmin;

    var userRating= function(voted){
      if (!Auth.isLoggedIn() || voted.length <= 0){
        return LIMITS.MIN_RATING;
      } else {
        var cu = Auth.getCurrentUser().name;
        var didRate = voted.filter(function(val, ind){
          return val.name === cu;
        });
        return didRate[0].rating;
      }
    };

    recipe.getRecipe($routeParams.id)
      .then(function(recipe) {
        recipe.rating = recipe.rating.toFixed(1);
        $scope.recipe = recipe;
        $scope.currentUserRating = userRating($scope.recipe.voted);

        switch ($routeParams.mode){
          case 'myfridge':
            $scope.bc = [
              {
                title: $scope.glossary.home,
                link: '/'
              },
              {
                title: $scope.glossary.inmyfridge,
                link: '/fridge'
              },
              {
                title: $scope.glossary.inmyfridgerecipes,
                link: '/recipes/myfridge/search/' + $routeParams.search
              },
              {
                title: $scope.recipe.name,
                link: null
              }
            ]
            break;
          case '':
            $scope.bc = [
              {
                title: $scope.glossary.home,
                link: '/'
              },
              {
                title: $scope.glossary.recipes,
                link: '/recipes'
              },
              {
                title: $scope.recipe.name,
                link: null
              }
            ]
            break;
        }
        arrangeIngredients();
      },
      function(){

      });

    var arrangeIngredients = function(){
      var middle = Math.ceil($scope.recipe.ingredients.length / 2);
      var mod = $scope.recipe.ingredients.length % 2;
      for (var i=0; i<middle; i++){
        $scope.ingredients.push($scope.recipe.ingredients[i]);

        if ((i < middle-1) && (mod !== 0)){
          $scope.ingredients.push($scope.recipe.ingredients[i+middle]);
        }
      }
    };

    $scope.$on('rate-it', function(evt, args){
      recipe.updateRating($scope.recipe, args)
        .then(function(data) {
          data.rating = data.rating.toFixed(1)
          $scope.recipe = data;

          arrangeIngredients();
        },
        function() {

        });
    });

  });
