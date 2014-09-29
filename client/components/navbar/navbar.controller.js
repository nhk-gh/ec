'use strict';

angular.module('ecApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, translator, breadCrumbSrv) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    /*
    console.log($scope.isNotEditRecipe);
    $scope.$on('bread-crumb', function(){
      console.log(breadCrumbSrv.currentCrumb());
      $scope.isNotEditRecipe = breadCrumbSrv.currentCrumb() !== 'Edit recipe';
    });
    */
    $scope.isNotEditRecipe = $location.path() !== '/newrecipe';

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    //$scope.language = translator.currentLanguage;

    /////////////////////////////////////
    //
    //   Search recipe(s)
    //
    /////////////////////////////////////
    $scope.searchCriteria = '';

    /////////////////////////////////////
    //
    //   Login dialog
    //
    /////////////////////////////////////
    $scope.openLoginDlg = function () {
      angular.element('#ecLoginModal').modal({backdrop:'static'});
    };

    /////////////////////////////////////
    //
    //   Sign up dialog
    //
    /////////////////////////////////////
    $scope.openSignupDlg = function () {
      angular.element('#ecSignupModal').modal({backdrop:'static'});
    };
  });