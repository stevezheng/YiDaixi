angular.module('app.common', [])
  .controller('HomeCtrl', function($scope, $yikeUser, $location) {
    $yikeUser.permission();
    $scope.open= function(target) {
      $location.path(target);
    };
  });

