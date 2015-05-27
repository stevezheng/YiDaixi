(function () {
  'use strict';

  angular
    .module('pay.show', [])
    .controller('PayShowCtrl', PayShowCtrl);

  PayShowCtrl.$inject = ['$scope', '$ionicPopup', '$location'];

  /* @ngInject */
  function PayShowCtrl($scope, $ionicPopup, $location) {
    $scope.init = init;
    $scope.user = AV.User.current();
    $scope.money = 500;
    $scope.card = '';
    $scope.pay = pay;
    $scope.open = _open;
    $scope.payCard = payCard;

    init();

    ////////////////

    function init() {
    }

    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    function payCard(card) {
      alertPopup('提示', '请输入正确的充值卡密码');
    }

    function pay() {
      alertPopup('提示', '支付接口申请中');
    }

    function _open(target) {
      $location.path(target);
    }
  }
})();