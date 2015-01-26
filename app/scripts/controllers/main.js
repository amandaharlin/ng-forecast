'use strict';

/**
 * @ngdoc function
 * @name forecastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forecastApp
 */
angular.module('forecastApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
