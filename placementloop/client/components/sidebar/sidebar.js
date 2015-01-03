'use strict';

angular.module('placementloopApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sidebar', {
        url: '/sidebar',
        templateUrl: 'components/sidebar/sidebar.html',
        controller: 'SidebarCtrl'
      });
  });