'use strict';

angular.module('ecApp').directive('gradientRating', function (LIMITS, Auth, $timeout, glossary) {
  return {
    templateUrl: 'components/directives/gradient-rating/gradient-rating.html',
    restrict: 'E',

    scope: {
      overall:'=',
      current: '=',
      voted: '=',
      viewed: '='
    },

    link: function(scope, element, attrs) {
      scope.glossary = glossary.getGlossary();

      var el = element.find('.rating-gradient');
      var elW;// = parseInt(el.css('width'));

      scope.userrating = null;

      var drawRatingBar = function(gradient) {
        var color;
        var pos = 0;

        if (gradient.mono === true) {
          color = '#e6f207';
          scope.userrating = null;
        } else {
          //pos = 100*(gradient.pos/elW);
          pos =  100*(gradient.pos/LIMITS.MAX_RATING);
          color = 'linear-gradient(to right,  #f28b7e 0%, #f28b7e ' + (pos-1) +
            '%, blue ' + (pos+0) + '% ,#07ef1e ' + (pos+0) +
            '% ,#07ef1e 100%)';


          //var r = LIMITS.MAX_RATING - pos/(100/LIMITS.MAX_RATING);
          var r = LIMITS.MAX_RATING - LIMITS.MAX_RATING*pos/100;
          if (r<1){ r=1;}

          var phase = scope.$$phase;
          if (phase === '$apply' || phase === '$digest') {
            scope.userrating = r.toFixed(1);
          } else {
            scope.$apply(function(){
              scope.userrating = r.toFixed(1);
            });
          }
        }
        el.css('background', color);
      };

      scope.$watch('overall', function(value){
        if (value !== undefined) {
          $timeout(function(){
            elW = parseInt(el.css('width'));

            if (value === '0.0') {
              drawRatingBar({pos:0, mono:true});
            } else {
              //var rating = elW - elW * (value / LIMITS.MAX_RATING);
              drawRatingBar({pos:LIMITS.MAX_RATING - scope.current, mono:false});
            }
          }, 1000);
        }
      });

      scope.ratable = attrs.ratable === 'true';

      if (attrs.ratable === 'true') {
        var rateOn = false;

        el.css('cursor','col-resize');

        el.on('mousedown', function(){
            rateOn = true;
          })
          .on('mouseup', function(){
            rateOn = false;
          })
          .on('mousemove', function(e){
            if (rateOn){
              drawRatingBar({pos:LIMITS.MAX_RATING*(e.clientX-$(this).offset().left)/elW, mono:false});
            }
          })
          .on('click', function(e){
            //drawRatingBar({pos:e.offsetX, mono:false});
            drawRatingBar({pos:LIMITS.MAX_RATING*(e.clientX-$(this).offset().left)/elW, mono:false});
          });

      } else {
        el.css('cursor','default');
      }

      scope.rateRecipe = function(){
        if (Auth.isLoggedIn()) {
          scope.$emit('rate-it', scope.userrating ) ;
        } else {
          angular.element('#ecLoginModal').modal({backdrop:'static'})
        }
      };
    }
  };
});