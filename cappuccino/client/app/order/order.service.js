'use strict';

angular.module('cappuccinoApp')
  .service('orderService', function orderService( $rootScope, $http, $log) {
    return {

      submitOrder: function(orderData, orderId) {
        var url = "/api/hockey/order";
        var method = "POST";

        if (orderId != undefined && orderId != null && orderId.length > 0) {
          url += "/" + orderId;
          method = "PUT";
        }
        var promise = $http({
          method: method,
          url: url,
          data: orderData
        });
        return promise;
      },

      getOrderList: function() {
        var promise = $http({
          method: "GET",
          url: "/api/hockey/order"
        });

        return promise;

      },

      getMatches: function(id) {
         var promise = $http({
          method: "GET",
          url: "/api/hockey/order/matchine/" + id
        });

        return promise;
      }
    };

  });
