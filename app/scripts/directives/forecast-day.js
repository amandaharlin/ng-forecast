'use strict';

/**
 * @ngdoc directive
 * @name forecastApp.directive:forecastDay
 * @description
 * # forecastDay
 */
angular.module('forecastApp')
  .directive('forecastDay', function () {
    return {
      templateUrl: './partials/forecast-day.html',
      restrict: 'E',
      replace: true,
      scope: {
        day: '=',
        width:'@'
      }
    };
  });