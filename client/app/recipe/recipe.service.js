'use strict';

angular.module('ecApp')
  .factory('recipe', function ($q, $http, $log) {
    return {
      getRecipe: function(id){
        var deferred = $q.defer();

        $http({method:'GET', url:'api/recipe/'+id.toString(), cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Recipe: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      },

      updateRecipe: function(recipe, newRating){
        var deferred = $q.defer();

        recipe.rating = (recipe.rating * recipe.ratings + parseInt(newRating)) / (recipe.ratings + 1);
        recipe.ratings += 1;

        $http({method:'PUT', url:'api/recipe/'+recipe._id, data:{recipe:recipe}, params:{what:'rating'},cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Update Recipe: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      }
    };
  });
