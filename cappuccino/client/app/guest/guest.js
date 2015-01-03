'use strict';

angular.module('cappuccinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guest', {
        url: '/',
        templateUrl: 'app/guest/guest.html',
        controller: 'GuestCtrl'
      });
  });