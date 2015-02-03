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
        index: index || 0,
        date: day.summary_date[0],
        weekDay: day.day_of_week[0].slice(0,3),
        highTemp: day.high[0],
        lowTemp: day.low[0],
        windSpeed: day.wnd_spd[0],
        windDirection: day.wnd_dir[0],
        precipPercent: day.pop[0],
        icon: day.wx_icon[0].replace('wxicons', 'wxicons2/150x100')
      };
    }

    var numberOfDaysInWeekForecast = 7;

    if((wx.daily_summary.length -1) < numberOfDaysInWeekForecast){
      numberOfDaysInWeekForecast = (wx.daily_summary.length - 1);
    }

    var currentDay = toDay(wx.daily_summary[$scope.selectedIndex || 0]);
    var week = wx.daily_summary.slice(0, numberOfDaysInWeekForecast + 1);


    var days = _.map(week, toDay);


    var weather_codes = {
      "71": {
        name: "light snow",
        metacon_val: 'U'
      },
      "73": {
        name: "snow",
        metacon_val: 'V'
      },
      "75": {
        name: "heavy snow",
        metacon_val: 'W'
      },
      "100": {
        name: "clear",
        metacon_val: 'E'
      },
      "101": {
        name: "mostly clear",
        metacon_val: 'E'
      },
      "102": {
        name: "partly cloudy",
        metacon_val: 'H'
      },
      "103": {
        name: "mostly cloudy",
        metacon_val: 'N'
      },
      "104": {
        name: "overcast",
        metacon_val: 'J'
      },
      "code_missing": {
        name: "na",
        metacon_val: ')'
      }
    };

    var get_weather_code = function (wx_code) {
      return weather_codes[wx_code] && weather_codes[wx_code].metacon_val || weather_codes["code_missing"].metacon_val
    }

    console.log(">>>", wx.forecast_info[0].location[0]._);
    $scope.location = wx.forecast_info[0].location[0].$;
    $scope.location.city = wx.forecast_info[0].location[0]._;

    $scope.weather_code = get_weather_code($scope.wx_code);

    console.log(forecast);

    // 0: {_: "Norman",…}
    // $: {lat: "35.1995", lon: "-97.4843", timezone: "CST", region: "OK", country: "United States of America",…}
    // _: "Norman"
    var currentCity = currentCity || {};
    currentCity.name = wx.forecast_info[0].location[0]._;
    currentCity.lat = wx.forecast_info[0].location[0].$.lat;
    currentCity.long = wx.forecast_info[0].location[0].$.lon;
    currentCity.timezone = wx.forecast_info[0].location[0].$.timezone;
    currentCity.region = wx.forecast_info[0].location[0].$.region;
    currentCity.country = wx.forecast_info[0].location[0].$.country;
    currentCity.zipcode = wx.forecast_info[0].location[0].$.zipcode;

    $scope.currentCity = currentCity;
    $scope.currentDay = currentDay;
    $scope.days = days;
  });
