'use strict';

angular.module('ecApp')
  .factory('main', function ($q, $http, $log) {
    return {
      getFeatures: function(){
        var deferred = $q.defer();

        $http({method:'GET', url:'api/feature', cache: false})
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data, status){
            $log.error('Get Features: ' + status);
            deferred.reject(status);
          });

        return deferred.promise;
      }
    };
  });
