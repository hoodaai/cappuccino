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
   function ($http, $scope, $modalInstance, $location, $rootScope, $modal) {

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


  $scope.cancel = function () {
  $modalInstance.close();
};

$scope.cancelOrder = function() {
  $modalInstance.close();
  var order = {
        status: 'Cancelled'
  }

  $http.patch('/api/hockey/order/'+$rootScope.cancelOrderId, order).success(function(order) {
    var modalInstance = $modal.open({
      template: '<div class="modal-header"></div><div class="modal-body">Your Order has been Cancelled.</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
      controller: 'ModalInstanceCtrl'
    });

    for (var i = $rootScope.orderList.length - 1; i >= 0; i--) {
     if($rootScope.orderList[i]._id === $scope.cancelOrderId) {
       $rootScope.orderList[i].status = "Cancelled";
     }
    };

  });
}


});