'use strict';

angular.module('ecApp')
  .directive('moreIngredients', function ($timeout, $location) {
    return {
      templateUrl: 'components/directives/more-ingredients/more-ingredients.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        $timeout(function(){
          scope.moreIngr = attrs.possible.split(',');
          scope.chosenIngr = attrs.chosen.split(',');
        }, 1000);

        scope.newIngredients = [];
        scope.searchWithNewIngr = function(){
          console.log(scope.newIngredients)
          for (var i=0; i<scope.newIngredients.length; i++){
            if (scope.newIngredients[i] === true){
              scope.chosenIngr.push(scope.moreIngr[i]);
            }
          }
          element.find('#ecMoreIngredients').modal('hide');

          $timeout(function(){
            var products = scope.chosenIngr.join(',');
            $location.path('/recipes/myfridge/search/' + products);
          }, 1000);
        }
      }
    };
  });