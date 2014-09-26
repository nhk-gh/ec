'use strict';

describe('Service: breadCrumb', function () {

  // load the service's module
  beforeEach(module('ecApp'));

  // instantiate service
  var breadCrumb;
  beforeEach(inject(function (_breadCrumb_) {
    breadCrumb = _breadCrumb_;
  }));

  it('should do something', function () {
    expect(!!breadCrumb).toBe(true);
  });

});
