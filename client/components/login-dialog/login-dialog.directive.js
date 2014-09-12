'use strict';

angular.module('ecApp')
  .directive('loginDialog', function (Auth, $window) {
    return {
      templateUrl: 'components/login-dialog/login-dialog.html',
      restrict: 'EA',
      link: function (scope, element) {
        scope.user = {};
        scope.errors = {};

        scope.login = function(form) {
          scope.submitted = true;
           if(form.$valid) {
            Auth.login({
              email: scope.user.email,
              password: scope.user.password
            })
              .then( function() {
                element.find('#ecLoginModal').modal('hide');
              }, function(err) {
                scope.errors.other = err.message;
              })
              .catch(function(err){
                console.log('catch');
              });
          }
        };

        scope.loginOauth = function(provider) {
          $window.location.href = '/auth/' + provider;
        };

        scope.hasEmptyFields = function(){
          return scope.user === {};
        };
      }
    };
  });