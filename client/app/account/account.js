'use strict';

angular.module('ecApp')
  .config(function ($routeProvider) {
    $routeProvider

     .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });