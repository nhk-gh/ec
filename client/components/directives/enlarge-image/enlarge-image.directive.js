'use strict';

angular.module('ecApp')
  .directive('enlargeImage', function ($window) {
    return {
      restrict: 'EA',
      scope:{

      },
      link: function (scope, element, attrs) {
        var tmrShow, tmrHide;

        element.on("mouseover", function(evt){
            var imgWidth = 256;
            var src = attrs.src;
            var lft = (evt.pageX - imgWidth) + 'px';
            var top = (evt.pageY - imgWidth/2) + 'px';

            var el = angular.element('<div class="larger-image"></div>');
            el.css({
              'display': 'inline-block',
              'left': lft,
              'top': top,
              'width': imgWidth+'px'
            });

            var img = el.append('<img/>');
            el.find('img').attr('src', src).css('width', imgWidth+'px');

            angular.element('body').append(el);

        })
        .on('mouseleave', function(){

              angular.element('.larger-image').remove();

        });

      }
    };
  });