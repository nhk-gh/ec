'use strict';

describe('Directive: breadCrumb', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/bread-crumb/bread-crumb.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bread-crumb></bread-crumb>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the breadCrumb directive');
  }));
});