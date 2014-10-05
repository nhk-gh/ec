'use strict';

angular.module('ecApp')
  .directive('breadCrumb', function ($rootScope, breadCrumbSrv, glossary) {
    return {
      templateUrl: 'components/directives/bread-crumb/bread-crumb.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
        scope.glossary = glossary.getGlossary();
        var currCrumb = breadCrumbSrv.currentCrumb();

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
              console.log(currCrumb);
              console.log(scope.glossary.myfridgerecipes);
              console.log(currCrumb == scope.glossary.myfridgerecipes);
              if (currCrumb == scope.glossary.myfridgerecipes) {
                breadCrumbSrv.addCrumb({
                  title:  scope.glossary.inmyfridge,
                  link: '/fridge'
                });
                breadCrumbSrv.addCrumb({
                  title:  scope.glossary.myfridgerecipes,
                  link: ''
                });
              } else {
                breadCrumbSrv.addCrumb({
                  title:  scope.glossary.recipes,//'Recipes',
                  link: '/recipes'
                });
              }

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
                title:  scope.glossary.inmyfridge,
                link: '/fridge'
              });
              break;

            case 'fridge-recipe':
              breadCrumbSrv.addCrumb({
                title:  scope.glossary.inmyfridge,
                link: '/fridge'
              });
              breadCrumbSrv.addCrumb({
                title:  scope.glossary.myfridgerecipes,
                link: ''
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