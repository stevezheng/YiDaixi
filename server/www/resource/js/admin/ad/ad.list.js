(function () {
  'use strict';

  angular
    .module('ad.list', [])
    .controller('AdListCtrl', AdListCtrl);

  AdListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function AdListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
    }
  }
})();