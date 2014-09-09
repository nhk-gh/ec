'use strict';

describe('Controller: NewrecipeCtrl', function () {

  // load the controller's module
  beforeEach(module('ecApp'));

  var NewrecipeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewrecipeCtrl = $controller('NewrecipeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
