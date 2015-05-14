(function () {
  'use strict';

  angular
    .module('order.doing')
    .controller('orderDoingCtrl', orderDoingCtrl);

  orderDoingCtrl.$inject = ['$rootScope, $scope, $location, $timeout'];

  /* @ngInject */
  function orderDoingCtrl($rootScope, $scope, $location, $timeout) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'orderDoingCtrl';

    activate();

    ////////////////

    function activate() {
    }
  }
})();