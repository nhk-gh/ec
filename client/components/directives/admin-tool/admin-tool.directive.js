'use strict';

angular.module('ecApp')
  .directive('adminTool', function ($window, $location, recipe, glossary, breadCrumbSrv) {
    return {
      templateUrl: 'components/directives/admin-tool/admin-tool.html',
      restrict: 'EA',
      scope:{
        rid: '='
      },

      link: function (scope, element, attrs) {
        scope.glossary = glossary.getGlossary();

        scope.comfirmDelete = false;

        scope.newRecipe = function(type, rid){
         /* breadCrumbSrv.setBreadCrumb({
            name: 'newrecipe',
            title: scope.glossary.editrecipe,
            param: null,
            link: null,
            parent: null
          });*/
          $location.path('/newrecipe/edit/id/' + rid);
        };

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