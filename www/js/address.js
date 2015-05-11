angular.module('app.address', [])
  .controller('AddressCtrl', function ($scope, $yikeUser, $location) {
    $yikeUser.permission();

    $scope.open = function (target) {
      $location.path(target);
    }
  })
  .controller('AddressAddCtrl', function ($scope, $yikeUser, $location) {
    $yikeUser.permission();

    $scope.open = function (target) {
      $location.path(target);
    }
  });
