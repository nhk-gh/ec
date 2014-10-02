'use strict';

angular.module('ecApp')
  .controller('MainCtrl', function ($scope, $location, main, glossary) {

    $scope.glossary = glossary.getGlossary();
    $scope.$on('language-changed', function(){
      $scope.glossary = glossary.getGlossary();

      $scope.features = [{
        name: $scope.glossary.recipes,
        info: $scope.glossary.recipesdescription,
        link: '/recipes'
      },
        {
          name: $scope.glossary.myfridge,
          info: $scope.glossary.myfridgedescription,
          link: '/fridge'
        },
        {
          name: $scope.glossary.party,
          info: $scope.glossary.partydescription,
          link: '/dinnerparty'
        }];
    });

    $scope.features = [{
      name: $scope.glossary.recipes,
      info: $scope.glossary.recipesdescription,
      link: '/recipes'
    },
    {
      name: $scope.glossary.myfridge,
      info: $scope.glossary.myfridgedescription,
      link: '/fridge'
    },
    {
      name: $scope.glossary.party,
      info: $scope.glossary.partydescription,
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