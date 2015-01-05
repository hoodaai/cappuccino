'use strict';

angular.module('cappuccinoApp')
  .controller('OrderCtrl',['$scope','$rootScope','$location','$http','$modal','$log', 'Auth',
  function($scope, $rootScope, $location, $http, $modal, $log, Auth) {

  $scope.order = {};
  $scope.rate = 7;
  $scope.max = 10;

  $rootScope.disableEnterOrderButton = true;
  $rootScope.screenTitle = 'Choose Order Type';
  $scope.loopDropDownValue = 'Select Loop';


   var id = $location.url().split('/')[1];
   if(id === 'placementorder') {
     $rootScope.screenTitle = 'Placement Order Entry';
   }
   if(id === 'recruitingorder') {
     $rootScope.screenTitle = 'Recruitment Order Entry';
   }

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
  
  $scope.chooseOrderType = function(loopName) {
    console.log('loopName: '+loopName);
    $scope.loopDropDownValue = loopName;
    $scope.showOrderType = true;
    $rootScope.disableEnterOrderButton = false;
  };

  $scope.redirectTo = function(path) {
    $location.path(path);
  }

  $scope.enterOrder = function(orderType, actorType) {
    var order = {
        name: $scope.order.name,
        orderType: orderType,
        actorType: actorType,
        status: 'Open',
        league: $scope.order.hockeyLeague,
        playerPosition: $scope.order.playerPosition,
        playerDOB: $scope.order.playerDateOfBirth,
        playerHeight: $scope.order.playerHeight,
        playerWeight: $scope.order.playerWeight,
        playerShootWith: $scope.order.playerShootWith,
        playerDefensiveScale: $scope.order.playerDefensiveScale,
        playerSystemBasedScale: $scope.order.playerSystemBasedScale,
        playerPhysicalScale: $scope.order.playerPhysicalScale,
        playerTeamFee: $scope.order.playerTeamFee,
        playerAccomodationCost: $scope.order.playerAccomodationCost,
        playerEquipmentFee: $scope.order.playerEquipmentFee,
        playerOwnTransport: $scope.order.playerOwnTransport
    } 
     //console.log(order);

    $http.post('/api/hockey/order', order).success(function(matchedOrder) {
      console.log(order);
       var modalInstance = $modal.open({
        template: '<div class="modal-header"><h3 class="modal-title">Matched Result</h3></div><div class="modal-body">Your Order has been Saved. We have ' + matchedOrder.hits.total + ' match for you</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
        controller: 'ModalInstanceCtrl'
      });
    });
  };

  var listOrders = function() {
    var id = $location.url().split('/')[1];
     if(id === 'orderlist') {
        $rootScope.screenTitle = 'View Customer Orders';
        $http.get('/api/hockey/order').success(function(orderlist) {
            $scope.orderList = orderlist;
            console.log(orderlist);
      });
     }
  }

var matchOrder = function() {
    var id = $location.url().split('/')[2];

    if(id !== undefined) {
      $rootScope.screenTitle = 'Matched Candidates';
      $http.get('/api/hockey/order/matchine/'+id).success(function(matchedOrder) {
        console.log(matchedOrder.hits.total);
        $scope.matchedOrderList = matchedOrder.hits.hits;
         console.log(matchedOrder.hits.hits.length);
      }); 
    };
  } 

$scope.cancelOrder = function(orderId) {
  var order = {
        status: 'Cancelled'
  }

  $http.patch('/api/hockey/order/'+orderId, order).success(function(order) {
            var modalInstance = $modal.open({
              template: '<div class="modal-header"></div><div class="modal-body">Your Order has been Cancelled.</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
              controller: 'ModalInstanceCtrl'
            });

           for (var i = $scope.orderList.length - 1; i >= 0; i--) {
             if($scope.orderList[i]._id === orderId) {
               $scope.orderList[i].status = "Cancelled";
             }
           };

  });
}

  $scope.viewMatches = function(id) {
     $location.path('/ordermatches/'+id);
  }


    $scope.order.playerWeight = 150;
    $scope.order.playerHeight = 167;

    $scope.order.playerDefensiveScale = 5;
    $scope.order.playerSystemBasedScale = 1;
    $scope.order.playerPhysicalScale = 1;

    $scope.order.playerTeamFee = '5';
    $scope.order.playerAccomodationCost = '0';
    $scope.order.playerEquipmentFee = '0';

    $scope.order.playerDateOfBirth = '2014-12-15T10:11:36.001Z';
    $rootScope.userType = 'placementloopuser';

  /*League multiselect dropdown settings*/
    $scope.order.hockeyLeague = [];
    $scope.hockeyLeagueData = [
        {id: 'EJHL', label: 'EJHL'},
        {id: 'NAHL', label: 'NAHL'},
        {id: 'OHL', label: 'OHL'},
        {id: 'QMJHL', label: 'QMJHL'},
        {id: 'WHL', label: 'WHL'},
        {id: 'USHL', label: 'USHL'}];

    $scope.hockeyLeagueSettings = {
        smartButtonMaxItems: 5,
        scrollableHeight: '200px',
        scrollable: true,
        buttonClasses: 'btn btn-primary',
        //{selectionLimit: 2};
        
    };

    $scope.hockeyLeagueTextSettings = {
       buttonDefaultText: 'Select League',
    };


/*Slider settings*/
  
    // Value to dollar ammount
    $scope.translateTeamFee = function(value) {
      return '$' + value + 'k';
    };

    $scope.translatePerMonthAccomodation = function(value) {
      return '$' + value + '/mo';
    };

    $scope.translatePerMonthEquip = function(value) {
      return '$' + value + '/mo';
    };

    $scope.translateCentimeter = function(value) {
      return value + ' cm';
    };

    $scope.translateLbs = function(value) {
      return value + ' lbs';
    };

    $scope.translateDefensiveStyle = function(value) {
      return '' + value;
    };

    $scope.translateSystemBasedStyle = function(value) {
      return '' + value;
    };

    $scope.translatePhysicalStyle = function(value) {
       return '' + value;
    };    
  
    listOrders();
    matchOrder();

  $scope.modal = {
    "title": "Title",
    "content": "Hello Modal<br />This is a multiline message!"
  };


$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  }]);
