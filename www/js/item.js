angular.module('app.item', [])
  .controller('ItemPieceCtrl', function($scope, $ionicHistory, $yikeUser) {
    $yikeUser.permission();
    $scope.back = function() {
      $ionicHistory.goBack();
    }
  })
  .controller('ItemBagCtrl', function($scope, $ionicHistory, $yikeUser) {
    $yikeUser.permission();
    $scope.back = function() {
      $ionicHistory.goBack();
    }
  })
