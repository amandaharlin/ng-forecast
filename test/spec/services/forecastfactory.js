'use strict';

describe('Service: forecastfactory', function () {

  // load the service's module
  beforeEach(module('forecastApp'));

  // instantiate service
  var forecastfactory;
  beforeEach(inject(function (_forecastfactory_) {
    forecastfactory = _forecastfactory_;
  }));

  it('should do something', function () {
    expect(!!forecastfactory).toBe(true);
  });

});
