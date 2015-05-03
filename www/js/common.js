angular.module('app.common', [])
  .controller('HomeCtrl', function($scope, $yikeUser) {
    $yikeUser.permission();
    $scope.open= function(target) {
      location.hash = target;
    };
  });

