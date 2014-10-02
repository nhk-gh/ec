'use strict';

angular.module('ecApp')
  .directive('breadCrumb', function ($rootScope, breadCrumbSrv, glossary) {
    return {
      templateUrl: 'components/directives/bread-crumb/bread-crumb.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
        scope.glossary = glossary.getGlossary();

        //$timeout( function(){
        attrs.$observe('name', function(value){
          if (attrs.path !== 'newrecipe'){
            breadCrumbSrv.initCrumb();
          }

          switch(attrs.path){
            case 'recipes':
              breadCrumbSrv.addCrumb({
                title: scope.glossary.recipes,//'Recipes',
                link: '/recipes'
              });
              break;

            case 'recipe':
              breadCrumbSrv.addCrumb({
                title:  scope.glossary.recipes,//'Recipes',
                link: '/recipes'
              });
              breadCrumbSrv.addCrumb({
                title: attrs.name,
                link: '/recipe/' + attrs.rcpid
              });
              break;

            case 'newrecipe':
              if (breadCrumbSrv.currentCrumb() !== attrs.action + ' recipe') {
                breadCrumbSrv.addCrumb({
                  title: attrs.action + ' recipe',
                  link: ''
                });
              }
              break;

            case 'fridge':
              breadCrumbSrv.addCrumb({
                title:  scope.glossary.myfridge,//'Recipes',
                link: '/recipes'
              });
              break;
          }

          scope.bc = breadCrumbSrv.getCrumb();
          $rootScope.$broadcast('bread-crumb');
        });
        //},800);

      }
    };
  });