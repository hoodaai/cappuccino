'use strict';

angular.module('cappuccinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('enteranorder', {
        url: '/enteranorder',
        templateUrl: 'app/order/chooseloop.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('recruitingorder', {
        url: '/recruitingorder',
        templateUrl: 'app/order/recruitingorder.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('recruitingorderEdit', {
        url: '/recruitingorder/e/:id',
        templateUrl: 'app/order/recruitingorder.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('placementorder', {
        url: '/placementorder',
        templateUrl: 'app/order/placementorder.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('placementorderEdit', {
        url: '/placementorder/e/:id',
        templateUrl: 'app/order/placementorder.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('orderlist', {
        url: '/orderlist',
        templateUrl: 'app/order/orderlist.html',
        controller: 'OrderCtrl',
        authenticate: true
      })
      .state('ordermatches', {
        url: '/ordermatches/:id',
        templateUrl: 'app/order/ordermatches.html',
        controller: 'OrderCtrl',
        authenticate: true
      });
  });