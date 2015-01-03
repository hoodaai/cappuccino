'use strict';

angular.module('placementloopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guest', {
        url: '/',
        templateUrl: 'app/guest/guest.html',
        controller: 'GuestCtrl'
      });
  });