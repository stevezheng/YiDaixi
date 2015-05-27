(function () {
  'use strict';

  angular
    .module('order.list', [])
    .controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', 'order', '$location', '$ionicPopup'];

  /* @ngInject */
  function OrderListCtrl($scope, order, $location, $ionicPopup) {
    $scope.active = 'doing';
    $scope.cancel = cancel;

    init();

    ////////////////

    function init() {
      queryDoing();
      queryDone();
    }

    function queryDoing() {
      order.query({status: ['!=', [-1, 3]]}, 1, 20)
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

    function cancel(item) {
      if (item.get('status') !== 3) {
        var cancelPopup = $ionicPopup.confirm({
          'title': '提醒'
          , 'template': '确认是否取消订单？'
          , 'okType': 'button-balanced'
        });

        cancelPopup.then(function(res) {
          if (res) {
            D('order')
              .where({objectId: item.id})
              .update({status: -1})
              .then(function(r) {
                $ionicPopup.alert({
                  'title': '提醒'
                  , 'template': '订单取消成功'
                  , 'okType': 'button-balanced'
                });
              });
          }
        });
      }
    }
  }
})();