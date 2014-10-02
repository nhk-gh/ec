'use strict';

angular.module('ecApp').controller('NewrecipeCtrl',
  function ($scope, $routeParams, $window, $timeout, newrecipe, recipe, LIMITS, Auth, glossary, $route) {
    $scope.glossary = glossary.getGlossary();

    $scope.$on('language-changed', function(){
      $scope.glossary = glossary.getGlossary();

      if ($routeParams.type && $routeParams.type === 'user'){
        $scope.action = $scope.glossary.send;
      } else if ($routeParams.type && $routeParams.type === 'edit'){
        $scope.action = $scope.glossary.edit;
      } else {
        $scope.action = $scope.glossary.add;
      }
    });

    var imageFiles = [];
    $scope.showSuccess = false;

    $scope.isAdmin = Auth.isAdmin;
    var approved;

    var initRecipeObj = function (obj){
      newrecipe.getCategories().then(
        function(data) {
          $scope.categories = data;
          $scope.categories.unshift({name:$scope.glossary.selectcategory,_id: 0});
          //$scope.newRecipe.category = $scope.categories[0];

          if (obj){
            $scope.newRecipe = obj;

            approved = $scope.newRecipe.approved;

            for (var i=0; i<$scope.newRecipe.instructions.length; i++){
              $scope.instructionLeftSymbols(i);
            }
            for (var i=0; i<$scope.newRecipe.notes.length; i++){
              $scope.noteLeftSymbols(i);
            }
            $scope.descriptionLeftSymbols();

            //$scope.newRecipe.category = $scope.categories[0];
            for (var i=0; i< $scope.categories.length; i++){
              if ($scope.newRecipe.category.name ===  $scope.categories[i].name) {
                $scope.newRecipe.category = $scope.categories[i];
                break;
              }
            }
          } else {
            $scope.newRecipe = {};
            $scope.newRecipe.name = '';
            $scope.newRecipe.category = $scope.categories[0];
            $scope.newRecipe.cousine = '';
            $scope.newRecipe.description = '';// left:};
            $scope.newRecipe.duration = 10;
            $scope.newRecipe.ingredients = [{name: '', qtty: '', note: ''}];
            $scope.newRecipe.instructions =[{step: '', image: 'assets/images/drop-here-1.png'}];

            $scope.newRecipe.grant = {name:'', image:''};
            $scope.newRecipe.date = {type:Date, date:null};
            $scope.newRecipe.notes = [];
            $scope.newRecipe.rating = 0;
            $scope.newRecipe.voted = [];
            $scope.newRecipe.viewed = 0;
            $scope.newRecipe.approved = approved;

            $scope.leftSymbols = {
              description:LIMITS.DESCRIPTION_LEN,
              instruction: [LIMITS.INSTRUCTION_LEN],
              notes: [LIMITS.NOTE_LEN]
            };
          }
        },
        function(){
          $scope.categories = ['Appetizer','Soup','Salad'];
        }
      );
    };

    if ($routeParams.type && $routeParams.type === 'user'){
      $scope.action = $scope.glossary.send;
      approved = false;
      initRecipeObj();
    } else if ($routeParams.type && $routeParams.type === 'edit'){
      $scope.action = $scope.glossary.edit;
      //console.log($routeParams);
      recipe.getRecipe($routeParams.id)
        .then(function(recipe) {
          //console.log(recipe);
          recipe.rating = recipe.rating.toFixed(1);
          initRecipeObj(recipe);
        },
        function(){

        });
    } else {
      $scope.action = $scope.glossary.add;
      approved = true;
      initRecipeObj();
    }
    $scope.instrEditImage = function(ind){
      if($scope.newRecipe.instructions[ind].image === '') {
        return 'assets/images/drop-here-1.png';
      }

      return $scope.newRecipe.instructions[ind].image;
    };

    $scope.leftSymbols = {
      description:LIMITS.DESCRIPTION_LEN,
      instruction: [LIMITS.INSTRUCTION_LEN],
      notes: [LIMITS.NOTE_LEN]
    };

    $scope.descriptionLeftSymbols = function(){
      $scope.leftSymbols.description =
        LIMITS.DESCRIPTION_LEN - $scope.newRecipe.description.length;
    };

    $scope.instructionLeftSymbols = function(ind){
      $scope.leftSymbols.instruction[ind] =
        LIMITS.INSTRUCTION_LEN - $scope.newRecipe.instructions[ind].step.length;
    };

    $scope.noteLeftSymbols = function(ind){
      $scope.leftSymbols.notes[ind] =
        LIMITS.NOTE_LEN - $scope.newRecipe.notes[ind].length;
    };

    $scope.addIngredient = function(){
      $scope.newRecipe.ingredients.push({name: '', qtty: '', note: ''});
    };

    $scope.removeIngredient = function(ind){
      $scope.newRecipe.ingredients.splice(ind, 1);
    };

    $scope.addInstruction = function(){
      $scope.newRecipe.instructions.push({step: '', image: 'assets/images/drop-here.png'});
    };

    $scope.removeInstruction = function(ind){
      $scope.newRecipe.instructions.splice(ind, 1);
    };

    $scope.addNote = function(){
      $scope.newRecipe.notes.push('');
      $scope.leftSymbols.notes.push(LIMITS.NOTE_LEN);
    };

    $scope.removeNote = function(ind){
      $scope.newRecipe.notes.splice(ind, 1);
      $scope.leftSymbols.notes.splice(ind, 1);
    };

    $scope.hasEmptyFields = function(){
      var r = $scope.newRecipe;
      var empty = false;

      if ((r.grant.name.trim() === '') || (r.name.trim() ==='') ||
          (r.duration <= 0) || !r.duration) {
        empty = true;
      } else {
        var i;
        for(i=0; i<r.ingredients.length; i++){
          if (r.ingredients[i].name.trim() === '' || r.ingredients[i].qtty.trim() === ''){
            empty = true;
            break;
          }
        }
        if (!empty) {
          for(i=0; i<r.instructions.length; i++){
            if (r.instructions[i].step.trim() === ''){
              empty = true;
              break;
            }
          }
        }
      }
      return (empty);
    };

    $scope.addRecipe = function() {
      if ($scope.action === $scope.glossary.edit) {
        recipe.updateRecipe($scope.newRecipe)
          .then(function(data) {
            uploadImageFile(data._id);
            $window.history.back();
          },
          function() {

          });
      } else {
        $scope.newRecipe.date.date = Date.now();
        recipe.addRecipe($scope.newRecipe).then(
          function(data){
            uploadImageFile(data._id);
            $scope.$broadcast('splash-panel');

            initRecipeObj();


            $scope.showSuccess = true;
            $timeout(function(){
              $route.reload();
              $scope.showSuccess = false;
            },2000);
          },
          function(){

          });
      }
    };

    $scope.$on('file-dropzone-drop-event', function(evt, data){
      imageFiles[data.ind] = data.file;

      var num = (data.ind < 10) ? ("0" + data.ind) : data.ind; // 20 max
      //$scope.newRecipe.instructions[data.ind].image = num + "-" + data.name;
    });

    var uploadImageFile = function(id) {
      if (imageFiles.length > 0){
        var fd = new FormData();

        for (var i in imageFiles) {
          fd.append('files', imageFiles[i]);
        }

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "/api/recipe/" + id);
       // $scope.progressVisible = true;
        xhr.send(fd);
      }

      function uploadProgress(evt) {
        $scope.$apply(function(){
          if (evt.lengthComputable) {
            $scope.progress = Math.round(evt.loaded * 100 / evt.total);
          } else {
            $scope.progress = 'unable to compute';
          }
        });
      };

      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        $scope.$apply(function(){
          $scope.progressVisible = false;
          $scope.info = JSON.parse(evt.target.responseText).info;

          imageFiles = [];
        })
      }

      function uploadFailed(evt) {
        $scope.$apply(function(){
          $scope.progressVisible = false;
          $scope.info = "There was an error attempting to upload the file.";
          imageFiles = [];
        });
      }

      function uploadCanceled(evt) {
        $scope.$apply(function(){
          $scope.progressVisible = false;
          $scope.info = "The upload has been canceled by the user or the browser dropped the connection.";
          imageFiles = [];
        })
      }
    }
  }
);
