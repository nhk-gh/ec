'use strict';

angular.module('ecApp')
  .directive('adminTool', function ($window, recipe) {
    return {
      templateUrl: 'components/directives/admin-tool/admin-tool.html',
      restrict: 'EA',
      scope:{
        id: '='
      },

      link: function (scope, element, attrs) {
        scope.comfirmDelete = false;
        scope.editRecipe = function(){
          $window.location = '/newrecipe?type=edit&id=' + scope.id;
        };

        scope.deleteRecipe = function(){
          //console.log($window.location);
          recipe.deleteRecipe(scope.id)
            .then(function(data){
              if ($window.location.pathname === '/recipes'){
                scope.$emit('recipe-deleted');
              } else {
                $window.history.back();
              }
            })
        };
      }
    };
  });