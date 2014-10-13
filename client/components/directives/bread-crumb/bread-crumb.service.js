'use strict';

angular.module('ecApp')
  .factory('breadCrumbSrv', function (glossary) {
    var bcrumb = [];
    var gl = glossary.getGlossary();

    var initBreadCrumb = function(){
      bcrumb = [];
      bcrumb.push({
        title: gl.home,
        link: '/'
      });
    };

    return {
      setBreadCrumb: function(crumb){
        initBreadCrumb();

        switch(crumb.name){
          case gl.recipes:
          case gl.inmyfridge:
          case gl.party:
            bcrumb.push({
              title: crumb.title,
              link: crumb.link
            });
            break;

          case gl.inmyfridgerecipes:
            bcrumb.push({
              title: gl.inmyfridge,
              link: '/fridge'
            });
            bcrumb.push({
              title: gl.inmyfridgerecipes,
              link: crumb.link
            });
            break;

          case gl.recipe:
            if (crumb.parent === '/recipes') {
              bcrumb.push({
                title: gl.recipes,
                link: crumb.parent
              });
              bcrumb.push({
                title: crumb.title,
                link: crumb.link
              });
            } else if (crumb.parent === '/fridge'){
              bcrumb.push({
                title: gl.inmyfridge,
                link: crumb.parent
              });
              bcrumb.push({
                title: gl.inmyfridgerecipes,
                link: '/recipes' + crumb.param
              });
              bcrumb.push({
                title: crumb.title,
                link: crumb.link
              });
            }
            break;

          case 'newrecipe':
            bcrumb.push({
              title: crumb.title,
              link: crumb.link
            });

            break;
        }
      },

      getBreadCrumb: function(){
        return bcrumb;
      },

      currentCrumb: function(){
        if (bcrumb.length > 1){
          return bcrumb[bcrumb.length - 1].title;
        } else {
          return "Home";
        }
      },

      removeCrumbs: function(ind){
        bcrumb.splice(ind + 1, bcrumb.length - ind + 1);
      }
    }
  });
