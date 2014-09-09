'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newrecipe', {
        templateUrl: 'app/newrecipe/newrecipe.html',
        controller: 'NewrecipeCtrl'
      });
  });
