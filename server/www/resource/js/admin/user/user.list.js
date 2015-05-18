(function () {
  'use strict';

  angular
    .module('user.list', [])
    .controller('UserListCtrl', UserListCtrl);

  UserListCtrl.$inject = ['$scope'];

  /* @ngInject */
  function UserListCtrl($scope) {
    $scope.init = init;
    $scope.page = 1;
    $scope.listRows = 20;
    $scope.totalPage = 1;
    $scope.filter = {};

    $scope.changePage = changePage;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('User')
        .page($scope.page, $scope.listRows)
        .where($scope.filter)
        .select()
        .then(function(res) {
          $scope.data = res;
          $scope.$digest();
        });

      D('User')
        .count()
        .then(function(count) {
          $scope.count = count;
          $scope.totalPage = Number(count / $scope.page);
        });
    }

    function changePage(page)  {
      if (page > 0 && page <= $scope.totalPage) {
        $scope.page = page;
        query();
      }
    }
  }
})();