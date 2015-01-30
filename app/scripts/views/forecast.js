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
    var wx = forecast.forecast || {};
    $scope.forecast = forecast;
    $scope.forecastInfo = wx['forecast_info'][0];
    $scope.dailySummary = wx.daily_summary[0];

    $scope.location = wx.forecast_info[0].location[0].$;
    $scope.location.city = wx.forecast_info[0].location[0]._;
    $scope.wxIcon = wx.daily_summary[0].wx_icon[0];

    console.log(forecast);
  });