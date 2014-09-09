'use strict';

angular.module('ecApp')
  .factory('newrecipe', function ($q, $http, $log) {
    return {
      getCategories: function () {
        var deferred = $q.defer();

        $http({method:'GET', url:'api/category', cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Categories: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      },

      addRecipe: function(recipe){
        var deferred = $q.defer();

        $http({method:'POST', url:'api/recipe', data:{recipe:recipe}, cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Categories: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      }
    };
  });
