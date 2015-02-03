'use strict';

/**
 * @ngdoc directive
 * @name forecastApp.directive:forecastCurrent
 * @description
 * # forecastCurrent
 */
angular.module('forecastApp')
  .directive('forecastCurrent', function () {
    return {
      templateUrl: './partials/forecast-current.html',
      restrict: 'E',
      replace: true,
      scope: {
        day: '=',
        city: '='
      }
    };
  });
