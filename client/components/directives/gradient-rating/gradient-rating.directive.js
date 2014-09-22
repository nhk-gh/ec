'use strict';

angular.module('ecApp').directive('gradientRating', function (LIMITS, $timeout, Auth) {
  return {
    templateUrl: 'components/directives/gradient-rating/gradient-rating.html',
    restrict: 'E',

    scope: {
      overall:'=',
      voted: '=',
      viewed: '='
    },

    link: function(scope, element, attrs) {
      var el = element.find('.rating-gradient');
      var elW;// = parseInt(el.css('width'));

      scope.userrating = 1;

      var drawRatingBar = function(gradient) {
        var color;
        var pos = 0;

        if (gradient.mono === true) {
          color = '#e6f207';
        } else {
          pos = 100*(gradient.pos/elW);
          color = 'linear-gradient(to right,  #f28b7e 0%, #f28b7e ' + (pos-0) +
            '%, black ' + pos + '% ,#07ef1e ' + (pos+0) +
            '% ,#07ef1e 100%)';
        }

        scope.$apply(function(){
          var r = LIMITS.MAX_RATING - pos/(100/LIMITS.MAX_RATING);
          if (r<1){ r=1;}
          scope.userrating = r.toFixed(1);
        });

        el.css('background', color);
      };

      $timeout(function(){
        elW = parseInt(el.css('width'));
        if (scope.overall === '0.0') {
          drawRatingBar({pos:0, mono:true});
        } else {
          var rating = elW - elW * (scope.overall / LIMITS.MAX_RATING);
          drawRatingBar({pos:rating, mono:false});
        }
      }, 700);

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
              drawRatingBar({pos:e.offsetX, mono:false});
            }
          })
          .on('click', function(e){
            drawRatingBar({pos:e.offsetX, mono:false});
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