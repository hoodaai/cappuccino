'use strict';

angular.module('cappuccinoApp')
  .controller('DashboardCtrl', function ($scope, $location) {
    $scope.message = 'Hello';

    $scope.redirectTo = function(path) {
      $location.path(path);
    }

  });
