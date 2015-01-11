'use strict';

angular.module('cappuccinoApp')
  .controller('ContactModalCtrl',['$scope','$modalInstance',
  function($scope, $modalInstance) {

  $scope.init = function() {
    $scope.firstName ="";
    $scope.lastName = "";
    $scope.email ="";
  };

  $scope.ok = function() {

    $modalInstance.close({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email
    });

    $scope.init();
    $scope.newContactForm.$setPristine();

  };

  $scope.cancel = function () {
    $scope.init();
    $scope.newContactForm.$setPristine();
  };

  $scope.init();

  }]);
