angular.module('app.common', [])
  .controller('HomeCtrl', function($scope) {
    $scope.open= function(target) {
      location.hash = target;
    };
  });

