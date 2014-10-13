'use strict';

angular.module('ecApp')
  .controller('FridgeCtrl', function ($scope, $location, glossary) {
    $scope.glossary  = glossary.getGlossary();
    $scope.productsFound = '';

    $scope.bc = [
      {
        title: $scope.glossary.home,
        link: '/'
      },
      {
        title: $scope.glossary.inmyfridge,
        link: null
      }];

    $scope.lookFor = function(products) {
     /* breadCrumbSrv.setBreadCrumb({
        name: $scope.glosssary.inmyfridgerecipes,
        title: $scope.glosssary.inmyfridgerecipes,
        param: null,
        link: '',
        parent: '/fridge'
      }); */

      $location.path('/recipes/myfridge/search/' + products);
    };
  });
