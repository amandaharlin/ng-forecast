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
  
    function toDay(day, index){
      return {
        date: day.summary_date[0],
        weekDay: day.day_of_week[0],
        highTemp: day.high[0],
        lowTemp: day.low[0],
        windSpeed: day.wnd_spd[0],
        windDirection: day.wnd_dir[0],
        precipPercent: day.pop[0],
        icon: day.wx_icon[0]
      };
    }
  
    var numberOfDaysInWeekForecast = 6;
  
    if((wx.daily_summary.length -1) < numberOfDaysInWeekForecast){
      numberOfDaysInWeekForecast = (wx.daily_summary.length - 1);
    }
  
    var currentDay = toDay(wx.daily_summary[0]);
    var week = wx.daily_summary.slice(1, numberOfDaysInWeekForecast + 1);
  

    var days = _.map(week, toDay);


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

    var get_weather_code = function (wx_code) {
      return weather_codes[wx_code] && weather_codes[wx_code].metacon_val || weather_codes["code_missing"].metacon_val
    }


    $scope.weather_code = get_weather_code($scope.wx_code);

    console.log(forecast);

    $scope.currentDay = currentDay;
    $scope.days = days;
  });