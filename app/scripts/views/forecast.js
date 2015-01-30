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
    $scope.forecastInfo = wx.forecast_info[0];
    $scope.dailySummary = wx.daily_summary[0];


    // $scope.city.details = $scope.forecastInfo.$[0];
    // $scope.city = $scope.forecastInfo._[0];

    $scope.summaryDate = $scope.dailySummary.summary_date[0];
    $scope.weekDay = $scope.dailySummary.day_of_week[0];
    $scope.high = $scope.dailySummary.high[0];

    $scope.low = $scope.dailySummary.low[0];
    $scope.wnd_spd = $scope.dailySummary.wnd_spd[0];
    $scope.wnd_dir = $scope.dailySummary.wnd_dir[0];
    $scope.pop = $scope.dailySummary.pop[0];
    // $scope.wx_icon = $scope.dailySummary.wx_icon[0];
    $scope.wx_icon_text = $scope.dailySummary.wx_icon_text[0];
    //$scope.wx_icon = "http://content.wdtinc.com/images/wxicons2/150x100/" + $scope.wx_icon_text + ".png"
    $scope.wx_code = $scope.dailySummary.wx_code[0];

    var weather_codes = {
      "71": {
        name: "light snow",
        metacon_val: 'X'
      },
      "73": {
        name: "snow",
        metacon_val: 'V'
      },
      "75": {
        name: "heavy",
        metacon_val: 'W'
      },
      "100": {
        name: "clear",
        metacon_val: 'X'
      },
      "101": {
        name: "snow",
        metacon_val: 'V'
      },
      "102": {
        name: "heavy",
        metacon_val: 'W'
      },
      "103": {
        name: "cloudy",
        metacon_val: 'N'
      },
      "104": {
        name: "Overcast",
        metacon_val: 'N'
      },
      "code_missing": {
        name: "na",
        metacon_val: ')'
      }
    };

    var get_weather_code = function(wx_code) {
      return weather_codes[wx_code] && weather_codes[wx_code].metacon_val || weather_codes["code_missing"].metacon_val
    }


    $scope.weather_code = get_weather_code($scope.wx_code);



  });
