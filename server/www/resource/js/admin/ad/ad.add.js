(function () {
  'use strict';

  angular
    .module('ad.add', [])
    .controller('AdAddCtrl', AdAddCtrl);

  AdAddCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AdAddCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();