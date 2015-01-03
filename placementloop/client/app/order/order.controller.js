'use strict';

angular.module('placementloopApp')
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

  $scope.enterPlacementOrder = function() {
    var order = {
        name: $scope.order.name,
        orderType: 'PLACEMENT',
        user: Auth.getCurrentUser,
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
    $http.post('/api/hockey/order', order).success(function(matchedOrder) {
      console.log(order);
      var myModal = $modal({title: 'Matched Result',
       content: 'Your Order has been Saved. We have ' + matchedOrder.hits.total + ' match for you',
       show: true});
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


  }]);
