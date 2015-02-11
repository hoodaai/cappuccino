'use strict';

angular.module('cappuccinoApp')
  .controller('ForgotPasswordCtrl', function ($scope, Auth, $location, $window) {
        $scope.user = {
            email: ""
        };
    
        $scope.emailSent = false;
        
        $scope.sendEmail = function() {
            $scope.emailSent = true;
        }
        
        $scope.gotoLogin = function() {
            
        }
  });
