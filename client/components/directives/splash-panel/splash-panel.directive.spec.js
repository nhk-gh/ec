'use strict';

describe('Directive: splashPanel', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/splash-panel/splash-panel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<splash-panel></splash-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the splashPanel directive');
  }));
});