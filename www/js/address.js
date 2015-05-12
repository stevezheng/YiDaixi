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
      D('address').add({'a': 'a', 'b': 'c'}).then(function(res) {
        console.log(res);
      });
      $location.path(target);
    }
  });
