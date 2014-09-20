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

      updateRating: function(recipe, newRating){
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

        if (hadVoted === -1) {
          rcp.rating = (rcp.rating * rcp.voted.length + newRate) / (rcp.voted.length + 1);
          rcp.voted.push({name: uName, rating: newRate});
        } else {
          rcp.rating = ((rcp.rating * rcp.voted.length) - rcp.voted[hadVoted].rating + newRate) / (rcp.voted.length);
          rcp.voted[hadVoted].rating = newRate;
        }

        $http({method:'PUT', url:'api/recipe/'+rcp._id, data:{recipe:rcp}, cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Update Recipe: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      },

      addRecipe: function(recipe){
        var deferred = $q.defer();

        var files = [];

        for (var i=0; i< recipe.instructions.length; i++) {
          if (recipe.instructions[i].file){
            files[i] = recipe.instructions[i].file
            delete recipe.instructions[i].file;
          }
        }
        //console.log(files);
        //console.log(recipe);

        $http({method:'POST', url:'api/recipe', data:{recipe:recipe}, cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Categories: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      },

      updateRecipe: function(recipe){
        var deferred = $q.defer();

        $http({method:'PUT', url:'api/recipe/'+recipe._id, data:{recipe:recipe}, cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Update Recipe: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      },

      deleteRecipe: function(id){
        var deferred = $q.defer();

        $http({method:'DELETE', url:'api/recipe/'+ id, cache: false})
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
