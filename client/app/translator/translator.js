'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/translator', {
        templateUrl: 'app/translator/translator.html',
        controller: 'TranslatorCtrl'
      });
  });
