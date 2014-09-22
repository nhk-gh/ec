'use strict';

angular.module('ecApp')
  .directive('enlargeImage', function () {
    return {
      restrict: 'EA',
      scope:{

      },
      link: function (scope, element, attrs) {
        var tmrShow, tmrHide;

        element.on("mouseenter", function(evt){
            var imgWidth = 256;
            var src = attrs.src;
            var lft = (evt.clientX - imgWidth) + 'px';
            var top = (evt.clientY - imgWidth/2) + 'px';

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