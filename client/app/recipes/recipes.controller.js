'use strict';

angular.module('ecApp')
  .controller('RecipesCtrl', function ($scope, $routeParams, $location, recipes, Auth, glossary, breadCrumbSrv) {
    $scope.glossary = glossary.getGlossary();
    $scope.$on('language-changed', function(){
      $scope.glossary = glossary.getGlossary();
      $scope.chkboxTitle = $scope.glossary.newonly;
      //$scope.$apply();
    });

    var searchCriteria = $routeParams.search ? $routeParams.search : '';
    var srchMode = '';
    if ($routeParams.searchmode && $routeParams.searchmode === 'myfridge') {
      srchMode ='myfridge';
    }

    switch (srchMode){
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
            link: null
          }
        ]
        break;
    }

    var setRecipeImage = function(ind){
      var imgStr = $scope.page.recipes[ind].instructions[$scope.page.recipes[ind].instructions.length-1].image;

      if (imgStr && imgStr !== ''){
        return imgStr;
      }
      return 'assets/images/cat-food-hearts-icon-128x128.png';
    };

    $scope.recipes = [];
    $scope.isAdmin = Auth.isAdmin;
    $scope.newOnly = false;  // if true: get only new recipes that is not approved yet
    $scope.chkboxTitle = $scope.glossary.newonly;
    $scope.page = {};
    $scope.ingredients = [];
/*
    $scope.selectRecipe = function(rcp){
      if (srchMode === 'myfridge'){
        breadCrumbSrv.setBreadCrumb({
          name: $scope.glossary.recipe,
          title: rcp.name,
          param: '/myfridge/search/' + searchCriteria,
          link: '/recipe/' + rcp._id,
          parent: '/fridge'
        });
      } else {
        breadCrumbSrv.setBreadCrumb({
          name: $scope.glossary.recipe,
          title: rcp.name,
          param: null,
          link: '/recipe/' + rcp._id,
          parent: '/recipes'
        });
      }
      $location.path('/recipe/' + rcp._id);
    };
*/

    $scope.moreIngredients = function () {
      angular.element('#ecMoreIngredients').modal({backdrop:'static'});
    };

    $scope.pageChanged = function(){
      var begin = $scope.page.current - 1;
      var end = begin + $scope.page.itemsPerPage;
      $scope.page.recipes = $scope.allRecipes.slice(begin, end);

      for (var i=0; i<$scope.page.recipes.length; i++){
        $scope.page.recipes[i].recipeImage = setRecipeImage(i);
      }
    };

    var possibleIngredients = function(rcp){
      if (rcp.length === 0) {
        return [];
      } else {
        var moreIngredients = ''
        var moreLowCase = '';
        var chosenIngredients = $scope.searchCriteria.split(',');
        var chosenLowCase = chosenIngredients.map(function(val){
          return val.toLowerCase();
        });

        for (var i=0; i<rcp.length; i++) {
          for (var j=0; j<rcp[i].ingredients.length; j++){
            var ingredient = rcp[i].ingredients[j].name.trim().toLowerCase();

            if ($.inArray(ingredient, chosenLowCase) === -1){
              if ($.inArray(ingredient, moreLowCase) === -1){
                moreIngredients += rcp[i].ingredients[j].name.trim();
                moreLowCase += rcp[i].ingredients[j].name.trim().toLowerCase();

                moreIngredients += ',';
                moreLowCase += ',';
              }
            }
          }
        }

        var lastChar = moreIngredients[moreIngredients.length-1];
        if (lastChar === ','){
          moreIngredients= moreIngredients.substr(0,moreIngredients.length - 1);
        }

        return moreIngredients;
      }
    };

    $scope.getRecipes = function(searchCriteria, newOnly, mode){
      recipes.getRecipes(searchCriteria, newOnly, mode)
        .then(function(recipes) {
          $scope.searchCriteria = searchCriteria;// === '' ? 'All' : searchCriteria;

          if (mode === 'myfridge'){
            recipes[0].forEach(function(itm){
              itm.rating = itm.rating.toFixed(1);
            });

            $scope.allRecipes = recipes[0];
            $scope.ingredients = possibleIngredients(recipes[1]);
          } else {
            recipes.forEach(function(itm){
              itm.rating = itm.rating.toFixed(1);
            });

            $scope.allRecipes = recipes;
          }
          $scope.page.current = 1;
          $scope.page.itemsPerPage = 10;
          $scope.searchMode = mode;

          $scope.pageChanged();
        },
        function(){

        });
    };

    $scope.getRecipes(searchCriteria, $scope.newOnly, srchMode);

    $scope.$on('recipe-deleted', function(){
      $scope.getRecipes($scope.searchCriteria, $scope.newOnly)
    });
  });
