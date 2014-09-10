'use strict';

angular.module('ecApp')
  .directive('loginDialog', function () {
    return {
      templateUrl: 'components/login-dialog/login-dialog.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });