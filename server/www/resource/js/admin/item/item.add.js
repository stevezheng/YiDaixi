(function () {
  'use strict';

  angular
    .module('item.add', [])
    .controller('ItemAddCtrl', ItemAddCtrl);

  ItemAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function ItemAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();