(function() {
  'use strict';

  angular
    .module('order.cart', ['order.factory'])
    .controller('OrderCartCtrl', OrderCartCtrl)

    .$inject = ['$scope', '$location', 'order'];

  function OrderCartCtrl($scope, $location, order) {
    $scope.init = init;
    $scope.cart = order.cart;
    $scope.open = _open;

    console.log(order.cart);
    console.dir(order.cart);

    init();

    //实现

    function init() {}

    function _open(path) {
      $location.path(path);
    }
  }
})();