'use strict';

angular.module('ecApp')
  .controller('PartyCtrl', function ($scope, glossary) {
    $scope.glossary  = glossary.getGlossary();
    $scope.bc = [
      {
        title: $scope.glossary.home,
        link: '/'
      },
      {
        title: 'Dinner party',
        link: ''
      }
    ];

    $scope.party = [
      {
        name: 'Fourchette',
        link: '#',
        image: './assets/images/Buffet-party.jpg'
      },
      {
        name: 'Romantic',
        link: '#',
        image: './assets/images/Romantic-party.jpg'
      },
      {
        name: 'Friends',
        link: '#',
        image: './assets/images/Friends-party.jpg'
      },
      {
        name: 'Cocktail',
        link: '#',
        image: './assets/images/Cocktail-party.jpg'
      }
    ];
  });
