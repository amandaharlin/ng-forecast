'use strict';

ForecastApp
  .config(function dailyWeather($stateProvider) {

    function resolveForecast(Restangular, $stateParams) {

      var forecast = Restangular.one('forecast').get({
        location: $stateParams.location
      });

      return forecast;
    }

    var forecastView = {
      url: '/forecast?location',
      templateUrl: './views/forecast.html',
      controller: 'forecastViewCtrl',
      resolve: {
        forecast: resolveForecast
      }
    };

    $stateProvider
      .state('weatherforecaster.forecast', forecastView);
  });

ForecastApp
  .controller('forecastViewCtrl', function forecastViewCtrl($scope, forecast) {
    var forecast = forecast.forecast || {};
    $scope.forecastInfo = forecast.forecast_info[0];
    $scope.dailySummary = forecast.daily_summary[0];

  });
