'use strict';

describe('Directive: forecastDay', function () {

  // load the directive's module
  beforeEach(module('forecastApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<forecast-day></forecast-day>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the forecastDay directive');
  }));
});
