'use strict';

angular.module('ecApp')
  .factory('recipes', function ($q, $http, $log) {
    return {
      getRecipes: function(searchCriteria){
        var deferred = $q.defer();

        $http({method:'GET', url:'api/recipe', params:{search:searchCriteria}, cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Recipes: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      }
    };
  });

