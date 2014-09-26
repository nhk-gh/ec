'use strict';

angular.module('ecApp')
  .directive('searchBox', function ($location) {
    return {
      templateUrl: 'components/directives/search-box/search-box.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element) {

        var inp = element.find('.review-search');

        element.on('click', function() {
         // console.log(element.find('.review-search'))
          element.css('width', '60%');
          inp.css('width', '75%');
        })
        .on('mouseleave', function() {
          if (inp.val().trim() === ''){
            element.css('width', '30%');
            inp.css('width', '60%');
          }
        });

        scope.search = function(){
          element.css('width', '30%');
          inp.css('width', '60%');
          $location.path('/recipes/' + scope.searchCriteria);
        };
      }
    };
  });