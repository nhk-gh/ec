'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/party', {
        templateUrl: 'app/party/party.html',
        controller: 'PartyCtrl'
      });
  });
