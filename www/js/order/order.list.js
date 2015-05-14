(function () {
  'use strict';

  angular
    .module('order.list', [])
    .controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', 'order', '$location', '$ionicPopup'];

  /* @ngInject */
  function OrderListCtrl($scope, order, $location, $ionicPopup) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = 'orderListCtrl';

    init();

    ////////////////

    function init() {
    }
  }
})();