angular.module('app.item', [])
  .controller('ItemPieceCtrl', function($scope, $ionicHistory) {
    $scope.back = function() {
      $ionicHistory.goBack();
    }
  })
  .controller('ItemBagCtrl', function($scope, $ionicHistory) {
    $scope.back = function() {
      $ionicHistory.goBack();
    }
  })
