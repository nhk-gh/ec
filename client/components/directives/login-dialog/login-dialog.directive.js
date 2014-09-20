'use strict';

angular.module('ecApp')
  .directive('loginDialog', function (Auth, $window) {
    return {
      templateUrl: 'components/directives/login-dialog/login-dialog.html',
      restrict: 'EA',
      scope:{},
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

        scope.signup = function(){
          angular.element('#ecLoginModal').modal('hide');
          angular.element('#ecSignupModal').modal({backdrop:'static'});
        };

        scope.loginOauth = function(provider) {
          alert('Not implementet yet!');
          return;
          $window.location.href = '/auth/' + provider;
        };

        scope.hasEmptyFields = function(){
          return scope.user === {};
        };
      }
    };
  });