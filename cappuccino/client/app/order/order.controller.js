'use strict';

angular.module('cappuccinoApp').controller('OrderCtrl',
   function ($scope, $rootScope, $location, $http, $modal, $log, Auth) {

  $scope.order = {};
  $scope.rate = 7;
  $scope.max = 10;

  $rootScope.disableEnterOrderButton = true;
  $rootScope.screenTitle = 'Choose Order Type';
  $scope.loopDropDownValue = 'Select Loop';
  $scope.order.hockeyLeague = 'Select League';

   var id = $location.url().split('/')[1];
   if(id === 'placementorder') {
     $rootScope.screenTitle = 'Placement Order Entry';
   }
   if(id === 'recruitingorder') {
     $rootScope.screenTitle = 'Recruitment Order Entry';
   }

// View matches
   var ops = $location.url().split('/')[2];
    if(ops === 'e') {
      $http.get('/api/hockey/order/'+$location.url().split('/')[3]).success(function(order) {
        $scope.order = order;
        $log.debug($scope.order);
    });
   }

$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

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
  


  $scope.chooseLeague = function(league) {
    console.log('league: '+league);
    $scope.order.hockeyLeague = league;
    
  };

  $scope.redirectTo = function(path) {
    $location.path(path);
  }

  $scope.editOrder = function(orderId, orderType) {
    //$log.debug("editOrder");
    if(orderType == 'Recruitment') {
      $location.path('/recruitingorder/e/'+orderId);
    } else {
      $location.path('/placementorder/e/'+orderId);
    }
  }

  $scope.enterOrder = function(orderType, actorType) {
    var order = {
        id: $scope.order._id,
        name: $scope.order.name,
        orderType: orderType,
        actorType: actorType,
        status: 'Open',
        league: $scope.order.hockeyLeague,
        playerPosition: $scope.order.playerPosition,
        playerDOB: $scope.order.playerDOB,
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

    if($scope.order._id) {
      $http.put('/api/hockey/order/'+$scope.order._id, order).success(function(matchedOrder) {
       $log.debug(order);
       var modalInstance = $modal.open({
        template: '<div class="modal-header"><h3 class="modal-title">Matched Result</h3></div><div class="modal-body">Your Order has been Saved. We have ' + matchedOrder.hits.total + ' match for you</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
        controller: 'ModalInstanceCtrl'
       });
      });

    } else {
      $http.post('/api/hockey/order', order).success(function(matchedOrder) {
        $log.debug(order);
         var modalInstance = $modal.open({
          template: '<div class="modal-header"><h3 class="modal-title">Matched Result</h3></div><div class="modal-body">Your Order has been Saved. We have ' + matchedOrder.hits.total + ' match for you</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button></div>',
          controller: 'ModalInstanceCtrl'
         });
      });
    }
  };

  var listOrders = function() {
    var id = $location.url().split('/')[1];
     if(id === 'orderlist') {
        $rootScope.screenTitle = 'View Customer Orders';
        $http.get('/api/hockey/order').success(function(orderlist) {
            $rootScope.orderList = orderlist;
            $log.debug(orderlist);
      });
     }
  }

var matchOrder = function() {
    var id = $location.url().split('/')[2];
    var actorType = $location.url().split('/')[3];
    if(actorType !== undefined) {
      if(actorType.replace(/%20/g, " ") === 'Talent Seeker') {
        $scope.viewMatchesTitle = "Matched Candidate";
      } else {
        $scope.viewMatchesTitle = "Matched Talent Seeker";
      }
    }

    if(id !== undefined && id !== 'e') {
      
      $http.get('/api/hockey/order/matchine/'+id).success(function(matchedOrder) {
        $log.debug(matchedOrder.hits.total);
        $scope.matchedOrderList = matchedOrder.hits.hits;
        if (matchedOrder.hits.hits.length<1) {
          $scope.matchesNotFoundMsg = "We're sorry there aren't any matches meeting your requirements at this time. Would you like to edit your order?" ;
        }
        $log.debug(matchedOrder.hits.hits.length);
      }); 
    };
  } 

$scope.cancelOrderPopup = function(orderId) {
  $rootScope.cancelOrderId = orderId;
  var modalInstance = $modal.open({
      template: '<div class="modal-header"><h3 class="modal-title">Cancel Order</h3></div><div class="modal-body">Do you really want to cancel order.</div><div class="modal-footer"><button class="btn btn-primary" ng-click="cancelOrder()">Yes</button> <button class="btn btn-primary" ng-click="cancel()">No</button></div>',
      controller: 'ModalInstanceCtrl',
      resolve: {
        orderId: function () {
          return orderId;
        }
      }
    });
}



  $scope.viewMatches = function(id, actorType) {
     $location.path('/ordermatches/'+id+'/'+actorType);
  }

/* Default data configuration*/

    $scope.order.playerHeight = {
      min: 170,
      max: 180,
      floor: 162,
      ceil: 204
     
    };

    $scope.order.playerWeight = {
      min: 170,
      max: 180,
      floor: 150,
      ceil: 250
    };

    
    $scope.order.playerDefensiveScale = 5;
    $scope.order.playerSystemBasedScale = 1;
    $scope.order.playerPhysicalScale = 1;

    $scope.order.playerTeamFee = '5';
    $scope.order.playerAccomodationCost = '0';
    $scope.order.playerEquipmentFee = '0';

    $scope.order.playerDOB = '2014-12-15T10:11:36.001Z';
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

  });


