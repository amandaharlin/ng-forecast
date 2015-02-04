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
      },
      controller: function forecastdayCtrl($scope, $state, $stateParams) {
        // $scope.currentCity.alert = function() {window.alert('nooooo');}
        // $scope.currentDay.switchDay = function() {window.alert('day ' + function(){});}

        function selectDay(day) {

          $stateParams.selectedday = day.index;

          $state.go('weatherforecaster.forecast', $stateParams);

        }


        var selectedday = parseInt($stateParams.selectedday, 10) || 0

        $scope.active = !!(
          $scope.day.index == selectedday
        );

        $scope.selectDay = selectDay;
      }
    };
  });
