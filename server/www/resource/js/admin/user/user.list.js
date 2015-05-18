(function () {
  'use strict';

  angular
    .module('user.list', [])
    .controller('UserListCtrl', UserListCtrl);

  UserListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function UserListCtrl($scope) {
    $scope.init = init;

    init();

    ////////////////

    function init() {
      query({});
    }

    function query(filter) {
      return D('User')
        .query('select count(*),* from _User')
        .then(function(res) {
          $scope.data = res.results;
          $scope.$digest();
        });
    }
  }
})();