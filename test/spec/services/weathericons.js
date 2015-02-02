'use strict';

describe('Service: weatherIcons', function () {

  // load the service's module
  beforeEach(module('forecastApp'));

  // instantiate service
  var weatherIcons;
  beforeEach(inject(function (_weatherIcons_) {
    weatherIcons = _weatherIcons_;
  }));

  it('should do something', function () {
    expect(!!weatherIcons).toBe(true);
  });

});
