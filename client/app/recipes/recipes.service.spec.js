'use strict';

describe('Service: recipes', function () {

  // load the service's module
  beforeEach(module('ecApp'));

  // instantiate service
  var recipes;
  beforeEach(inject(function (_recipes_) {
    recipes = _recipes_;
  }));

  it('should do something', function () {
    expect(!!recipes).toBe(true);
  });

});
