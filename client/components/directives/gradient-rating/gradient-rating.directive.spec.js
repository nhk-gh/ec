'use strict';

describe('Directive: gradientRating', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/gradient-rating/gradient-rating.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gradient-rating></gradient-rating>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the gradientRating directive');
  }));
});