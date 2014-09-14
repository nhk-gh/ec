'use strict';

angular.module('ecApp')
  .factory('translator', function () {
    var language = {};

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
