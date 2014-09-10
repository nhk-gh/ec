'use strict';

angular.module('ecApp')
  .controller('MainCtrl', function ($scope, $location, main) {
    $scope.features = [];

    main.getFeatures()
      .then(function(fts) {
        $scope.features = fts;

      },
      function(){

      });
  });