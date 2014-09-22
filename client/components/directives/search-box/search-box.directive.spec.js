'use strict';

describe('Directive: searchBox', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/search-box/search-box.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-box></search-box>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the searchBox directive');
  }));
});