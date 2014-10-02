'use strict';

describe('Controller: FridgeCtrl', function () {

  // load the controller's module
  beforeEach(module('ecApp'));

  var FridgeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FridgeCtrl = $controller('FridgeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
