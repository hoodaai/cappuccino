'use strict';

angular.module('cappuccinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('guestnavbar', {
        url: '/guestnavbar',
        templateUrl: 'components/guestnavbar/guestnavbar.html',
        controller: 'GuestnavbarCtrl'
      });
  });