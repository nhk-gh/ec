'use strict';

angular.module('ecApp')
  .directive('requiredFld', function () {
    return {
      restrict: 'EA',
      link: function (scope, element) {

        var star = angular.element('<span style="color:red; font-size:0.9em; margin-top:-5px">&nbsp;*</span>');
        element.append (star);

      }
    };
  });