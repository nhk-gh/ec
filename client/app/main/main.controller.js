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

    var v = angular.element('.hero-unit img[alt="Welcome!"]');

    v.on('click', function(e){
      /*console.log(e.altKey);
      console.log(e.shiftKey);
      console.log(e.ctrlKey);  */

      if (e.ctrlKey && e.altKey){
        $scope.$apply(function(){
          $location.path('/newrecipe');
        });
      }
    });
  });