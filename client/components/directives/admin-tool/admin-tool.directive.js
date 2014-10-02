'use strict';

angular.module('ecApp')
  .directive('adminTool', function ($window, recipe, glossary) {
    return {
      templateUrl: 'components/directives/admin-tool/admin-tool.html',
      restrict: 'EA',
      scope:{
        rid: '='
      },

      link: function (scope, element, attrs) {
        scope.glossary = glossary.getGlossary();

        scope.comfirmDelete = false;

        scope.deleteRecipe = function(){
          //console.log($window.location);
          recipe.deleteRecipe(scope.rid)
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