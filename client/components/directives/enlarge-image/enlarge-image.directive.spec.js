'use strict';

describe('Directive: enlargeImage', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/enlarge-image/enlarge-image.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<enlarge-image></enlarge-image>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the enlargeImage directive');
  }));
});