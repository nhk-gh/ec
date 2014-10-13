'use strict';

angular.module('ecApp')
  .directive('searchBox', function ($location, glossary) {
    return {
      templateUrl: 'components/directives/search-box/search-box.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element) {
        scope.placeholder = glossary.getGlossary().search;

        var inp = element.find('.review-search');

        element
          .on('click keypress', function() {
           // console.log(element.find('.review-search'))
            element.css('width', '60%');
            inp.css('width', '75%');
          })
          .on('mouseleave', function() {
            if (scope.searchCriteria.trim() === ''){
              element.css('width', '30%');
              inp.css('width', '60%');
            }
          });

        scope.search = function(){
          element.css('width', '30%');
          inp.css('width', '60%');
          $location.path('/recipes/' + scope.searchCriteria);
        };

        scope.keyPressed = function(evt){
          if (evt.which === 13)
            scope.search();
        };
      }
    };
  });