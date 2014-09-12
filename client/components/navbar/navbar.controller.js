'use strict';

angular.module('ecApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, translator) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.language = translator.currentLanguage;

    /////////////////////////////////////
    //
    //   Search recipe(s)
    //
    /////////////////////////////////////
    $scope.searchCriteria = '';

    $scope.search = function(){
      //console.log($scope.searchCriteria);
      $location.path('/recipes/' + $scope.searchCriteria);

    };

    /////////////////////////////////////
    //
    //   Log in dialog
    //
    /////////////////////////////////////
    $scope.openLoginDlg = function () {
      angular.element('#ecLoginModal').modal({backdrop:'static'});
    };
  });