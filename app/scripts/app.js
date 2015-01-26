'use strict';

/**
 * @ngdoc overview
 * @name forecastApp
 * @description
 * # forecastApp
 *
 * Main module of the application.
 */

var applicationDependencies = [
 'ngAnimate',
 'ngAria',
 'ngCookies',
 'ngMessages',
 'ngSanitize',
 'ngTouch',
 'ui.router',
 'restangular'
];

window.ForecastApp = angular
  .module('forecastApp', applicationDependencies);

function declareDefaultStates($stateProvider) {
  var searchLocationView = {
    url: '/',
    templateUrl: './views/main.html'
  };
  $stateProvider
    .state('home', searchLocationView);
}

ForecastApp
  .config(declareDefaultStates)
  .run();