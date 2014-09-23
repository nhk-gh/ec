'use strict';

angular.module('ecApp')
  .controller('MainCtrl', function ($scope, $location, main) {
    $scope.features = [{
      name: 'Recipes',
      info: 'A huge number of recipes - easy to cook, affordable ingredients and absolutely delicious!.',
      link: '/recipes'
    },
    {
      name: 'In my Fridge',
      info: 'Stayed late at the office, didn’t have the chance to drop by the store ... Tell us what products you\'ve found in the kitchen and we will help you cook the best meal for dinner.',
      link: '/fridge'
    },
    {
      name: 'Dinner Party',
      info: 'Waiting for guests? Not a problem. Easy Cooking offers menu options for party: guests will be amazed and you will be proud.',
      link: '/dinnerparty'
    }];
    /*
    main.getFeatures()
      .then(function(fts) {
        $scope.features = fts;

      },
      function(){

      }); */
  });