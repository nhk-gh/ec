'use strict';

angular.module('ecApp')
  .controller('RecipesCtrl', function ($scope, $routeParams, recipes, Auth) {
    $scope.recipes = [];
    //$scope.isCollapsed = true;
    $scope.isAdmin = Auth.isAdmin;
    $scope.newOnly = false;  // if true: get only new recipes that is not approved yet
    $scope.chkboxTitle = 'New recipes only';
    var searchCriteria = $routeParams.search ? $routeParams.search : '';

    $scope.page = {};
    /*
    recipes.getRecipes(searchCriteria, $scope.newOnly)
      .then(function(recipes) {
        $scope.searchCriteria = searchCriteria === '' ? 'All' : searchCriteria;

        recipes.forEach(function(itm){
          itm.rating = itm.rating.toFixed(1);
        });

        $scope.allRecipes = recipes;
        $scope.page.current = 1;
        $scope.page.itemsPerPage = 10;
        
        $scope.pageChanged();
      },
      function(){

      });
    */

    var setRecipeImage = function(ind){
      var imgStr = $scope.page.recipes[ind].instructions[$scope.page.recipes[ind].instructions.length-1].image;

      if (imgStr && imgStr !== ''){
        return imgStr;
      }
      return 'assets/images/cat-food-hearts-icon-128x128.png';
    };

    $scope.pageChanged = function(){
      //console.log($scope.recipes);
      var begin = $scope.page.current - 1;
      var end = begin + $scope.page.itemsPerPage;
      $scope.page.recipes = $scope.allRecipes.slice(begin, end);

      for (var i=0; i<$scope.page.recipes.length; i++){
        $scope.page.recipes[i].recipeImage = setRecipeImage(i);
      }
    };

    $scope.getRecipes = function(searchCriteria, newOnly){
      recipes.getRecipes(searchCriteria, newOnly)
        .then(function(recipes) {
          $scope.searchCriteria = searchCriteria;// === '' ? 'All' : searchCriteria;

          recipes.forEach(function(itm){
            itm.rating = itm.rating.toFixed(1);
          });

          $scope.allRecipes = recipes;
          $scope.page.current = 1;
          $scope.page.itemsPerPage = 10;

          $scope.pageChanged();
        },
        function(){

        });
    };

    $scope.getRecipes(searchCriteria, $scope.newOnly);

    $scope.$on('recipe-deleted', function(){
      $scope.getRecipes($scope.searchCriteria, $scope.newOnly)
    });
  });
