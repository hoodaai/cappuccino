'use strict';

angular.module('placementloopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guestnavbar', {
        url: '/guestnavbar',
        templateUrl: 'components/guestnavbar/guestnavbar.html',
        controller: 'GuestnavbarCtrl'
      });
  });