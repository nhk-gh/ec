'use strict';

angular.module('ecApp')
  .directive('breadCrumb', function ($rootScope, $timeout/*, breadCrumbSrv, glossary*/) {
    return {
      templateUrl: 'components/directives/bread-crumb/bread-crumb.html',
      restrict: 'EA',
      replace: true,
      scope:{ bc:'=' },
      link: function (scope/*, element, attrs*/) {
        //scope.glossary = glossary.getGlossary();
        //var currCrumb = breadCrumbSrv.currentCrumb();

        //$timeout( function(){
        /*
        attrs.$observe('path', function(value){

          if (attrs.path !== 'newrecipe'){
            breadCrumbSrv.initCrumb();
          }

          switch(attrs.path){
            case 'recipes':
              console.log(attrs);
              if (attrs.mode === 'myfridge'){
                breadCrumbSrv.addCrumb({
                  title:  scope.glossary.inmyfridge,
                  link: '/fridge'
                });
                breadCrumbSrv.addCrumb({
                  title:  scope.glossary.myfridgerecipes,
                  link: ''
                });              } else {
                breadCrumbSrv.addCrumb({
                  title: scope.glossary.recipes,//'Recipes',
                  link: '/recipes'
                });
              }
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
                title:  scope.glossary.inmyfridge,
                link: '/fridge'
              });
              break;
          }

          scope.bc = breadCrumbSrv.getCrumb();
         // $rootScope.$broadcast('bread-crumb');
        });
        */
        //},800);

        /*
        scope.crumbClick = function(ind){
          console.log(ind)
          breadCrumbSrv.removeCrumbs(ind);
          scope.bc = breadCrumbSrv.getBreadCrumb();
        };

        $timeout( function(){
          scope.bc = breadCrumbSrv.getBreadCrumb();
        },0);  */
      }
    };
  });