'use strict';

angular.module('cappuccinoApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $modal, $log) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'enterorderModalContent.html',
        controller: 'ModalInstanceCtrl'
      });
    };

  });

  angular.module('cappuccinoApp').controller('ModalInstanceCtrl',
   function ($scope, $modalInstance, $location) {

  $scope.recruitingOrder = function () {
    $modalInstance.close();
    $location.path('/recruitingorder');
  };

  $scope.placementOrder = function () {
    $modalInstance.close();
    $location.path('/placementorder');
  };

  $scope.ok = function () {
    $modalInstance.close();
  };

});