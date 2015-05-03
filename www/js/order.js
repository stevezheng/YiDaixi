angular.module('app.order', [])
  .controller('OrderCtrl', function($scope, $yikeUser) {
    $yikeUser.permission();
  });
