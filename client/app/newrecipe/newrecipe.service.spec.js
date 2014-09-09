'use strict';

describe('Service: newrecipe', function () {

  // load the service's module
  beforeEach(module('ecApp'));

  // instantiate service
  var newrecipe;
  beforeEach(inject(function (_newrecipe_) {
    newrecipe = _newrecipe_;
  }));

  it('should do something', function () {
    expect(!!newrecipe).toBe(true);
  });

});
