(function () {
  'use strict';

  angular
    .module('order.list', [])
    .controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', 'order', '$location', '$ionicPopup', '$yikeUtils'];

  /* @ngInject */
  function OrderListCtrl($scope, order, $location, $ionicPopup, $yikeUtils) {
    $scope.active = 'doing';
    $scope.cancel = cancel;
    $scope.pay = pay;

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
              .find()
              .then(function(res) {
                if (res.get('status') === 1) {
                  var user = AV.User.current();
                  var money = user.get('money');
                  var _money = Number(money) + Number(item.get('cost'));
                  user.set('money', _money);
                  user.save();
                }

                D('order')
                  .where({objectId: item.id})
                  .update({status: -1})
                  .then(function() {
                    item.set('status', -1);
                    $ionicPopup.alert({
                      'title': '提醒'
                      , 'template': '订单取消成功'
                      , 'okType': 'button-balanced'
                    });
                  });
              });
          }
        });
      }
    }

    function pay(item) {
      var buttons = [
        {
          text: '上门收款'
          , type: 'button button-balanced button-block'
          , onTap: function(e) {
          return 'door';
          }
        },
        {
          text: '余额支付'
          , type: 'button button-balanced button-block'
          , onTap: function(e) {
          return 'money';
        }
        }
      ];
      $yikeUtils.show('请选择支付方式', '', $scope, buttons)
        .then(function(res) {
          if (res === 'money') {
            var user = AV.User.current();

            if (user.get('money') < item.get('cost')) {
              $yikeUtils.alert('提醒', '余额不足，请先充值');
              $yikeUtils.go('pay');
            } else {
              D('order')
                .where({objectId: item.id})
                .update({status: 1})
                .then(function() {
                  var user = AV.User.current();
                  var money = user.get('money');
                  var _money = Number(money) - Number(item.get('cost'));
                  user.set('money', _money);
                  user.save();
                  $yikeUtils.alert('提醒', '支付成功');
                  init();
                });
            }
          } else if (res === 'door') {
            D('order')
              .where({objectId: item.id})
              .update({status: 0.5})
              .then(function() {
                $yikeUtils.alert('提醒', '申请上门收款成功');
                init();
              });
          }
        });
      //$yikeUtils
      //  .confirm('提醒', '是否使用余额支付该订单')
      //  .then(function(result) {
      //    if (result) {
      //      var user = AV.User.current();
      //
      //      if (user.get('money') < item.get('cost')) {
      //        $yikeUtils.alert('提醒', '余额不足，请先充值');
      //        $yikeUtils.go('pay');
      //      }
      //    }
      //  });
    }
  }
})();