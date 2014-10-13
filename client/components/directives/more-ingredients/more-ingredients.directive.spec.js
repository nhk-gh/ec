'use strict';

describe('Directive: moreIngredients', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/more-ingredients/more-ingredients.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<more-ingredients></more-ingredients>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the moreIngredients directive');
  }));
});