'use strict';

describe('Service: glossary', function () {

  // load the service's module
  beforeEach(module('ecApp'));

  // instantiate service
  var glossary;
  beforeEach(inject(function (_glossary_) {
    glossary = _glossary_;
  }));

  it('should do something', function () {
    expect(!!glossary).toBe(true);
  });

});
