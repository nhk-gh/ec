'use strict';

describe('Directive: loginDialog', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/login-dialog/login-dialog.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-dialog></login-dialog>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the loginDialog directive');
  }));
});