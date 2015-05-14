(function () {
  'use strict';

  angular
    .module('order.done')
    .controller('orderDoneCtrl', orderDoneCtrl);

  orderDoneCtrl.$inject = ['$rootScope, $scope, $location, $timeout'];

  /* @ngInject */
  function orderDoneCtrl($rootScope, $scope, $location, $timeout) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'orderDoneCtrl';

    activate();

    ////////////////

    function activate() {
    }
  }
})();