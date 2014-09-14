'use strict';

describe('Directive: signupDialog', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/signup-dialog/signup-dialog.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<signup-dialog></signup-dialog>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signupDialog directive');
  }));
});