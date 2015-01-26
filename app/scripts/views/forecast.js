'use strict';

ForecastApp
  .config(function dailyWeather($stateProvider) {

    function forecastResolve(location, $stateParams) {
      return location.get($stateParams.location);
    }

    var forecastView = {
      url: '/forecast?location',
      templateUrl: './views/forecast.html',
      resolve: forecastResolve,
      controller: 'forecastViewCtrl'
    };
    $stateProvider
      .state('weatherforecaster.forecast', forecastView);
  });

ForecastApp
  .controller('forecastViewCtrl', function forecastViewCtrl($scope) {

  });