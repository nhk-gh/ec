'use strict';

describe('Directive: adminTool', function () {

  // load the directive's module and view
  beforeEach(module('ecApp'));
  beforeEach(module('components/directives/admin-tool/admin-tool.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<admin-tool></admin-tool>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the adminTool directive');
  }));
});