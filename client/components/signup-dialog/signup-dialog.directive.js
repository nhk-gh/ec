'use strict';

angular.module('ecApp')
  .directive('signupDialog', function (Auth, $window, LIMITS) {
    return {
      templateUrl: 'components/signup-dialog/signup-dialog.html',
      restrict: 'EA',
      scope:{},

      link: function (scope, element, attrs) {
        scope.user = {};
        scope.errors = {};
        scope.minPassLen = LIMITS.MIN_PASSWORD_LEN;

        scope.signup = function(form) {
          scope.submitted = true;

          if(form.$valid) {
            Auth.createUser({
              name: scope.user.name,
              email: scope.user.email,
              password: scope.user.password
            })
            .then( function() {
              // Account created, redirect to home
                element.find('#ecSignupModal').modal('hide');
            })
            .catch( function(err) {
              err = err.data;
              scope.errors = {};

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                scope.errors[field] = error.message;
              });
            });
          }
        };

        scope.isPasswordMatch = function(){
          var ret = false;

          if (scope.user.password){
            if (scope.user.password.length < scope.minPassLen){
              ret = false;
            } else {
              if (scope.user.password  === scope.user.cpassword) {
                ret = true;
              }
            }
          }

          return ret;
        };

        scope.hasEmptyFields = function(){
          //console.log (attrs);
          return scope.user == {};
        };
      }
    };
  });