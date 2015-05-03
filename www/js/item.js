angular.module('app.item', [])
  .controller('ItemPieceCtrl', function($scope, $ionicHistory, $location, $yikeUser) {
    $yikeUser.permission();
    $scope.money = 0;
    $scope.piece = 0;
    $scope.tabStatus = 9;

    $scope.addItem = function(value) {
      $scope.money += value;
      $scope.piece++;
    };

    $scope.back = function() {
      $location.path('/tab/home');
    };

    $scope.open = function(path) {
      $location.path(path);
    };
  })
  .controller('ItemBagCtrl', function($scope, $ionicHistory, $location, $yikeUser) {
    $yikeUser.permission();
    $scope.back = function() {
      $location.path('/tab/home');
    };

    $scope.open = function(path) {
      $location.path(path);
    };
  })
