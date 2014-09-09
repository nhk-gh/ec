'use strict';

angular.module('ecApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.searchCriteria = '';

    $scope.search = function(){
      //console.log($scope.searchCriteria);
      $location.path('/recipes/' + $scope.searchCriteria);
      /*
       recipes.getRecipes(searchCriteria)
       .then(function(recipes) {


       $scope.recipes = recipes;
       $scope.recipes.forEach(function(itm){
       itm.rating = itm.rating.toFixed(1);
       });

       },
       function(status){

       });*/
    };
  });