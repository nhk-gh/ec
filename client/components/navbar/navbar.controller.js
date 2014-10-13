'use strict';

angular.module('ecApp')
  .controller('NavbarCtrl', function ($scope, $location, $rootScope, Auth, glossary, breadCrumbSrv) {
    $scope.glossary = glossary.getGlossary();
    $scope.currentLanguage = glossary.getCurrentLanguage();

    $scope.changeLanguage = function(lang){
      //$scope.glossary = glossary.changeLanguage(lang)
      //$rootScope.$broadcast('language-changed');
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

   // $scope.isNotEditRecipe = $location.path() !== '/newrecipe/type';
    $scope.isNotEditRecipe = $location.path().indexOf('/newrecipe') === -1;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

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

    $scope.newRecipe = function(type){
      var nm;
      /*
      switch (type) {
        case 'user':
          nm = $scope.glossary.sendrecipe;
          break;
        case 'edit':
          nm = $scope.glossary.editrecipe;
          break;
        default:
          nm = $scope.glossary.newrecipe;
          break;
      }
      breadCrumbSrv.setBreadCrumb({
        name: 'newrecipe',
        title: nm,
        param: null,
        link: null,
        parent: null
      });
      */
      var path = '/newrecipe/'+type;
      //console.log(path);
      $location.path(path);
    };
  });