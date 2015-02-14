'use strict';

angular.module('cappuccinoApp')
  .controller('GuestCtrl', function ($scope, $rootScope) {
    $scope.message = 'Hello';

    $scope.chooseLoop = function(loop) {
    console.log('role: '+loop);
    $rootScope.loop = loop;
  };

  });
