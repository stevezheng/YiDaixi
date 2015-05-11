angular.module('app.address', [])
  .controller('AddressCtrl', function($scope, $yikeUser) {
    $yikeUser.permission();
  });
