(function () {
  'use strict';

  angular
    .module('address.list', [])
    .controller('AddressListCtrl', AddressListCtrl);

  AddressListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AddressListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();