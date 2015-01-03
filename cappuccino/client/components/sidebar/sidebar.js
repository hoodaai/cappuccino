'use strict';

angular.module('cappuccinoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sidebar', {
        url: '/sidebar',
        templateUrl: 'components/sidebar/sidebar.html',
        controller: 'SidebarCtrl'
      });
  });