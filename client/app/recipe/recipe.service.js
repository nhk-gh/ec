'use strict';

angular.module('ecApp')
  .factory('recipe', function ($q, $http, $log, Auth) {
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
        var uName = Auth.getCurrentUser().name;
        var newRate = parseFloat(newRating);
        var rcp = {};

        rcp = angular.copy(recipe);

        // check if current user had voted
        var hadVoted = -1;
        for (var i=0; i< recipe.voted.length; i++){
          if (recipe.voted[i].name === uName) {
            hadVoted = i;
            break;
          }
        }

        console.log(hadVoted);

        if (hadVoted === -1) {
          rcp.rating = (rcp.rating * rcp.voted.length + newRate) / (rcp.voted.length + 1);
          rcp.voted.push({name: uName, rating: newRate});
        } else {
          rcp.rating = ((rcp.rating * rcp.voted.length) - rcp.voted[hadVoted].rating + newRate) / (rcp.voted.length);
          rcp.voted[hadVoted].rating = newRate;
        }
        console.log(rcp.voted);

        $http({method:'PUT', url:'api/recipe/'+rcp._id, data:{recipe:rcp}, params:{what:'rating'},cache: false})
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
