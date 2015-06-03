(function () {
  'use strict';

  angular
    .module('item.list', ['order.factory'])
    .controller('ItemListCtrl', ItemListCtrl)

    .$inject = ['$scope', '$yikeUtils', 'order'];

  function ItemListCtrl($scope, $yikeUtils, order) {
    $scope.tabStatus = 9;
    $scope.query = query;
    $scope.back = back;
    $scope.open = _open;
    $scope.add = add;
    $scope.sub = sub;
    $scope.orderCart = orderCart;
    $scope.money = 0;
    $scope.piece = 0;


    init();

    ////////////////

    function init() {
      query();
    }

    function back() {
      _open('tab.home');
    }

    function _open(path) {
      $yikeUtils.go(path);
    }

    function orderCart() {
      if (order.cart.length !== 0) {
        _open('order-cart');
      } else {
        $yikeUtils.alert('提示', '请先选择订单产品');
      }
    }

    function query() {
      D('item')
        .select()
        .then(function (res) {
          $scope.item9 = [];
          $scope._item9 = [];
          $scope.item19 = [];
          $scope._item19 = [];
          $scope.item29 = [];
          $scope._item29 = [];

          AV._.each(res, function (item) {
            if (item.get('price') === '9') {
              if ($scope._item9.length < 3) {
                $scope._item9.push(item);
              } else {
                $scope.item9.push($scope._item9);
                $scope._item9 = [];
                $scope._item9.push(item);
              }
            } else if (item.get('price') === '19') {
              if ($scope._item19.length < 3) {
                $scope._item19.push(item);
              } else {
                $scope.item19.push($scope._item19);
                $scope._item19 = [];
                $scope._item19.push(item);
              }
            } else if (item.get('price') === '29') {
              if ($scope._item29.length < 3) {
                $scope._item29.push(item);
              } else {
                $scope.item29.push($scope._item29);
                $scope._item29 = [];
                $scope._item29.push(item);
              }
            }
          });

          $scope.item9.push($scope._item9);
          $scope.item19.push($scope._item19);
          $scope.item29.push($scope._item29);

          $scope.$digest();
        });
    }

    function add(item) {
      $scope.money += Number(item.get('price'));
      $scope.piece++;

      var index = AV._.indexOf(order.cart, item);

      if (index !== -1) {
        order.cart[index].count++;
      } else {
        item.count = 1;
        order.cart.push(item);
      }
    }

    function sub(item) {
      var index = AV._.indexOf(order.cart, item);
      if (index !== -1) {
        if ($scope.money >= Number(item.get('price'))) {
          if (order.cart[index].count > 0) {

            $scope.money -= Number(item.get('price'));
            $scope.piece--;
            order.cart[index].count--;
          }
        }
      }
    }
  }
})();