'use strict';

angular.module('ecApp').controller('NewrecipeCtrl',
  ['$scope', 'newrecipe', 'LIMITS', function ($scope, newrecipe, LIMITS) {

    newrecipe.getCategories().then(
      function(data){
        $scope.categories = data;
        $scope.categories.unshift({name:'-- Select category --',_id: 0});
        $scope.newRecipe.category = $scope.categories[0];
      },
      function(){
        $scope.categories = ['Appetizer','Soup','Salad'];
      }
    );

    $scope.newRecipe = {};
    $scope.newRecipe.name = '';
    //$scope.newRecipe.category = {name:''};
    $scope.newRecipe.cousine = '';
    $scope.newRecipe.description = '';// left:};
    $scope.newRecipe.duration = 0;
    $scope.newRecipe.ingredients = [{name: '', qtty: '', note: ''}];
    $scope.newRecipe.instructions =[{step: '', image: ''}];
    $scope.newRecipe.grant = {name:'', image:''};
    $scope.newRecipe.date = {type:Date, date:null};
    $scope.newRecipe.notes = [''];
    $scope.newRecipe.rating = 0;
    $scope.newRecipe.ratings = 0;
    $scope.newRecipe.viewed = 0;

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
      $scope.newRecipe.instructions.push({step: '', image: ''});
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
      var empty = r.grant.name + r.name;
      angular.forEach(r.ingredients, function(itm){
        empty += (itm.name+itm.qtty);
      });
      angular.forEach(r.instructions,function(itm){
        empty += itm.step;
      });
      console.log(empty);

      return (empty.trim() === '') || (r.duration <= 0) || (!r.duration);
    };

    $scope.addRecipe = function(){
      $scope.newRecipe.date.date = Date.now();
      //console.log($scope.newRecipe);
      newrecipe.addRecipe($scope.newRecipe).then(
        function(data){
          console.log(data);
        },
        function(){

        });
    };
  }]);
