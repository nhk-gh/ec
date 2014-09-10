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
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

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
        templateUrl: 'myLogin',
        controller: ModalLoginCtrl/*,
         resolve: {
         items: function () {
         return $scope.items;
         }
         } */
      });

      modalInstance.result.then(function (p) {
        userSrvc.user = angular.copy(p);
        $rootScope.$broadcast('logged-in');
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
        userSrvc.clearUser();
      });
      $scope.user = userSrvc.user;
    };

    var ModalLoginCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.loginErr = '';
      $scope.loginInfo = '';

      $scope.$on('password-sent', function(){
        $scope.loginInfo = 'Password was send to your e-mail address';
      });

      $scope.ok = function (res1, res2, res3) {
        var err = $('#login-form').validateAccount();
        if(err === '' ){
          accountService.login(res1, res2)
            .then(function(data) {
              if (data.error === 200) {
                data.user.remember = res3;
                $modalInstance.close(data.user);
              } else {
                $log.warn(data.message);
                $scope.loginErr = data.message;
                $scope.loginInfo = '';
              }
            }, function(status){
              $log.error(status);
              $scope.loginErr = status;
              $scope.loginInfo = '';
            });
        } else {
          $scope.loginErr = err;
          $scope.loginInfo = '';
          $log.warn(err);
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