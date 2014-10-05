'use strict';

angular.module('ecApp')
  .controller('FridgeCtrl', function ($scope, $window, glossary) {
    $scope.glosssary  = glossary.getGlossary();
    $scope.productsFound = '';

    $scope.lookFor = function(products) {
      $window.location.href = '/fridge-recipe?products=' + products;
    };
  });
