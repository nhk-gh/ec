'use strict';

angular.module('ecApp')
  .directive('fileDropzone', function () {
    return {
      restrict: 'A',
      scope: {
        id: '=',
        file: '@',
        action: '@'
      },
      link: function(scope, element, attrs) {
        // DnD
        var checkSize, getDataTransfer, isTypeValid, processDragOverOrEnter, validMimeTypes;

        validMimeTypes = attrs.fileDropzone;

        getDataTransfer = function(event) {
          var dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
          return dataTransfer;
        };

        processDragOverOrEnter = function(event) {
          if (event) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            if (event.stopPropagation) {
              return false;
            }
          }
          getDataTransfer(event).effectAllowed = 'copy';
          return false;
        };

        checkSize = function(size) {
          var _ref;
          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
            return true;
          } else {
            //$log.error('File must be smaller than ' + attrs.maxFileSize + ' MB');
            scope.$emit('errorMsg', 'File must be smaller than ' + attrs.maxFileSize + ' MB');
            return false;
          }
        };

        isTypeValid = function(type) {
          if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
            return true;
          } else {
            //$log.error('Invalid file type.  File must be one of following types ' + validMimeTypes);
            scope.$emit('ERROR-MSG', 'Invalid file type.  File must be one of following types ' + validMimeTypes);
            return false;
          }
        };

        element.bind('dragover', processDragOverOrEnter);

        element.bind('dragenter', processDragOverOrEnter);

        element.bind('drop', function(event) {
          if (event !== null) {
            event.preventDefault();
          }
          prepareFile(getDataTransfer(event).files[0]);

          return false;
        });

        // Open dialog
        var fb = element.find('input[type=file]');
        //console.log(fb[0])
        element.on('click', function(evt) {
          //console.log(evt);
          fb[0].click();
        });

        fb.on('change', function(evt){
          prepareFile(evt.target.files[0]);
        });

        // read file and prepare data for upload
        var prepareFile = function(fl){
          var file, name, reader, size, type;

          reader = new FileReader();

          reader.onload = function(evt) {
            if (checkSize(size) && isTypeValid(type)) {
              scope.$apply(function() {
                scope.file = evt.target.result;
                if (scope.action === 'Edit'){
                  element.find('img#'+scope.id+'e').attr('src', scope.file);
                  console.log( element.find('img#'+scope.id+'e').attr('src'));
                } else {
                  element.find('img#'+scope.id).attr('src', scope.file);
                  console.log( scope.action);
                }
              });

              return scope.$emit('file-dropzone-drop-event', {
                file: file,//scope.file,
                type: type,
                name: name,
                size: size,
                ind: scope.id
              });
            }
          };
          file = fl;
          name = file.name;
          type = file.type;
          size = file.size;

          reader.readAsDataURL(file);
        };
      }
    };
  });