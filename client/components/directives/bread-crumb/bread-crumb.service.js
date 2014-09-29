'use strict';

angular.module('ecApp')
  .factory('breadCrumbSrv', function () {
    var bcrumb = [];

    return {
      initCrumb: function(){
        bcrumb = [];
        bcrumb.push({
          title:'Home',
          link: '/'
        });
      },

      addCrumb: function(obj){
        bcrumb.push(obj);
      },

      getCrumb: function(){
        return bcrumb;
      },

      currentCrumb: function(){
        if (bcrumb.length > 1){
          return bcrumb[bcrumb.length - 1].title;
        } else {
          return "Home";
        }
      }
    }
  });
