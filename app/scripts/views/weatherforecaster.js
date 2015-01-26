'use strict';

ForecastApp
  .config(function weatherforecaster($stateProvider) {
    var weatherforecasterView = {
      url: '/weatherforecaster',
      templateUrl: './views/weatherforecaster.html',
      controller: 'weatherforecasterViewCtrl'
    };
    $stateProvider
      .state('weatherforecaster', weatherforecasterView);
  });


ForecastApp
  .controller('weatherforecasterViewCtrl', function weatherforecasterViewCtrl($scope, $state, $stateParams) {
    function navigate() {
      
      if(!$scope.location){
        alert('You must enter a location!');
        return;
      }
      
      $stateParams.location = $scope.location;
      $state.go('weatherforecaster.forecast', $stateParams);
    }

    $scope.location = '';
    $scope.navigate = navigate;
  });
