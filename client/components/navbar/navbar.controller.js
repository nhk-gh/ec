'use strict';

angular.module('ecApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $modal) {

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

      var modalInstance = $modal.open({
        templateUrl: 'ecLogin',
        controller: ModalLoginCtrl/*,
         resolve: {
           items: function () {
           return $scope.items;
           }
         } */
      });

      modalInstance.result.then(function (p) {

      }, function () {

      });
    };

    var ModalLoginCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.user = {};
      $scope.errors = {};

      $scope.$on('password-sent', function(){
        $scope.loginInfo = 'Password was send to your e-mail address';
      });

      $scope.login = function (form) {
        $scope.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
            .then( function() {
              // Logged in, redirect to home
              //$location.path('/');
              $modalInstance.close(user);
            })
            .catch( function(err) {
              $scope.errors.other = err.message;
            });
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.passwordReminder = function(){
        $rootScope.$broadcast('reminder');
      };
    }];


  });