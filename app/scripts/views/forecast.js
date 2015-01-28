'use strict';

ForecastApp
  .config(function dailyWeather($stateProvider) {

    function forecastResolve(forecast) {
        var listofForecast = Restangular.get('forecasts');
    }

    var forecastView = {
      url: '/forecast?location',
      templateUrl: './views/forecast.html',
      controller: 'forecastViewCtrl',
      resolve: forecastResolve
    };

    $stateProvider
      .state('weatherforecaster.forecast', forecastView);
  });

ForecastApp
  .controller('forecastViewCtrl', function forecastViewCtrl($scope, forecast) {
    $scope.forecast = forecast;
  });
