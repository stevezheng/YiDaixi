(function () {
  'use strict';

  angular
    .module('address.add', [])
    .controller('AddressAddCtrl', AddressAddCtrl);

  AddressAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AddressAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();