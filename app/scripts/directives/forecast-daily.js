'use strict';

/**
 * @ngdoc directive
 * @name forecastApp.directive:forecastDaily
 * @description
 * # forecastDaily
 */
angular.module('forecastApp')
  .directive('forecastDaily', function () {
    return {
      templateUrl: './partials/forecast-daily.html',
      restrict: 'E',
      replace: true,
      scope: {
        days: '='
      },
      controller: function ($scope) {
        var dayLength = $scope.days ? $scope.days.length : 0;
        
        
        $scope.width = 100/dayLength;
      }

    };
  });