(function() {
  'use strict';

  angular
    .module('item.list', [])
    .controller('ItemListCtrl', ItemListCtrl)

    .$inject = ['$scope'];

  function ItemListCtrl($scope) {
    var self = this;

    $scope.tabStatus = 9;
    $scope.query = query;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('item')
        .select()
        .then(function (res) {
          $scope.item9 = [];
          $scope._item9 = [];
          $scope.item19 = [];
          $scope._item19 = [];
          $scope.item29 = [];
          $scope._item29 = [];

          AV._.each(res, function(item) {
            if (item.get('price') === '9') {
              if ($scope._item9.length < 3) {
                $scope._item9.push(item);
              } else {
                $scope.item9.push($scope._item9);
                $scope._item9 = [];
                $scope._item9.push(item);
              }
            } else if (item.get('price') === '19') {
              if ($scope._item19.length < 3) {
                $scope._item19.push(item);
              } else {
                $scope.item19.push($scope._item19);
                $scope._item19 = [];
                $scope._item19.push(item);
              }
            } else if (item.get('price') === '29') {
              if ($scope._item29.length < 3) {
                $scope._item29.push(item);
              } else {
                $scope.item29.push($scope._item29);
                $scope._item29 = [];
                $scope._item29.push(item);
              }
            }
          });

          $scope.item9.push($scope._item9);
          $scope.item19.push($scope._item19);
          $scope.item29.push($scope._item29);

          $scope.$digest();
        });
    }
  }
})();