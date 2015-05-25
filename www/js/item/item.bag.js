(function() {
  'use strict';

  angular
    .module('item.bag', [])
    .controller('ItemBagCtrl', ItemBagCtrl)
    .$inject = ['$scope', '$location'];

  function ItemBagCtrl($scope, $location) {
    init();

    $scope.back = back;

    $scope.open = _open;

    //实现

    function init() {
    }

    function back() {
      _open('/tab/home');
    }

    function _open(path) {
      $location.path(path);
    }
  }
})();