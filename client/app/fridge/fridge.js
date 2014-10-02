'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/fridge', {
        templateUrl: 'app/fridge/fridge.html',
        controller: 'FridgeCtrl'
      });
  });
