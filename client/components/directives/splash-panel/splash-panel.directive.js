'use strict';

angular.module('ecApp')
  .directive('splashPanel', function ($window, $timeout) {
    return {
      restrict: 'EA',
      link: function (scope, element) {

        $timeout(function(){
          var wdt = parseInt(element.css('width'));
          var hgt = parseInt(element.css('height'));
          var lft = ($window.outerWidth - wdt + 180)/2;
          var top = ($window.outerHeight - hgt)/3;
          element.css({'left': lft, 'top': top});
        }, 500);

        scope.$on('splash-panel', function(){
          console.log(scope)
          $timeout(function(){
            var wdt = parseInt(element.css('width'));
            var hgt = parseInt(element.css('height'));
            var lft = ($window.outerWidth - wdt + 180)/2;
            var top = ($window.outerHeight - hgt)/3;
            element.css({'left': lft, 'top': top});
          }, 50);
        });
      }
    };
  });