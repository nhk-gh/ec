'use strict';

angular.module('ecApp')
  .directive('breadCrumb', function ($timeout, breadCrumb) {
    return {
      templateUrl: 'components/directives/bread-crumb/bread-crumb.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {

        $timeout( function(){
          if (attrs.path !== 'newrecipe'){
            breadCrumb.initCrumb();
          }

          switch(attrs.path){
            case 'recipes':
              breadCrumb.addCrumb({
                title: 'Recipes',
                link: '/recipes'
              });
              break;

            case 'recipe':
              breadCrumb.addCrumb({
                title: 'Recipes',
                link: '/recipes'
              });
              breadCrumb.addCrumb({
                title: attrs.name,
                link: '/recipe/' + attrs.rcpid
              });
              break;

            case 'newrecipe':
              breadCrumb.addCrumb({
                title: attrs.action + ' recipe',
                link: ''
              });
              break;
          }

          scope.bc = breadCrumb.getCrumb();
          scope.$broadcast('bread-crumb');

        },500);

      }
    };
  });