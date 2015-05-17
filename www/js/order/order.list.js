(function () {
  'use strict';

  angular
    .module('order.list', [])
    .controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', 'order', '$location', '$ionicPopup'];

  /* @ngInject */
  function OrderListCtrl($scope, order, $location, $ionicPopup) {
    $scope.active = 'doing';

    init();

    ////////////////

    function init() {
      queryDoing();
      queryDone();
    }

    function queryDoing() {
      order.query({status: ['!=', 3]}, 1, 20)
        .then(function(res) {
          $scope.doing = res;
          $scope.$digest();
        });
    }

    function queryDone() {
      order.query({status: 3}, 1, 20)
        .then(function(res) {
          $scope.done = res;
          $scope.$digest();
        });
    }
  }
})();