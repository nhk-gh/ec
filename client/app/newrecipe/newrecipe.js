'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newrecipe/:type', {
        templateUrl: 'app/newrecipe/newrecipe.html',
        controller: 'NewrecipeCtrl'
      })
      .when('/newrecipe/:type/id/:id', {
        templateUrl: 'app/newrecipe/newrecipe.html',
        controller: 'NewrecipeCtrl'
      });
  });
