'use strict';

describe('Controller: PartyCtrl', function () {

  // load the controller's module
  beforeEach(module('ecApp'));

  var PartyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartyCtrl = $controller('PartyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
