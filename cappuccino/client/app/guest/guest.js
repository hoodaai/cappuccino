'use strict';

angular.module('cappuccinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guest', {
        url: '/',
        templateUrl: 'app/guest/guest.html',
        controller: 'GuestCtrl'
      })
      .state('hockey', {
        url: '/hockey',
        templateUrl: 'app/guest/hockey.html',
        controller: 'GuestCtrl'
      })
      .state('guest-signup', {
        url: '/guest-signup',
        templateUrl: 'app/guest/visitorsignup.html',
        controller: 'GuestCtrl'
      });
  });