'use strict';

angular.module('ecApp')
  .controller('MainCtrl', function ($scope, $location, main, glossary, breadCrumbSrv) {

    $scope.glossary = glossary.getGlossary();
    $scope.$on('language-changed', function(){
      $scope.glossary = glossary.getGlossary();

      $scope.features = [{
        name: $scope.glossary.recipes,
        info: $scope.glossary.recipesdescription,
        link: '/recipes'
      },
        {
          name: $scope.glossary.inmyfridge,
          info: $scope.glossary.inmyfridgedescription,
          link: '/fridge'
        },
        {
          name: $scope.glossary.party,
          info: $scope.glossary.partydescription,
          link: '/party'
        }];
    });

    $scope.features = [{
      name: $scope.glossary.recipes,
      info: $scope.glossary.recipesdescription,
      link: '/recipes'
    },
    {
      name: $scope.glossary.inmyfridge,
      info: $scope.glossary.inmyfridgedescription,
      link: '/fridge'
    },
    {
      name: $scope.glossary.party,
      info: $scope.glossary.partydescription,
      link: '/party'
    }];
/*
    $scope.selectFeature = function(ft){
      breadCrumbSrv.setBreadCrumb({
        name:   ft.name,
        title:  ft.name,
        param:  null,
        link:   ft.link,
        parent: null
      });
      $location.path(ft.link);
    }*/
  });