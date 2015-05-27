angular.module('app.user', [])
  .controller('UserCtrl', function($scope, $yikeUser, $location) {
    $yikeUser.permission();

    $scope.logout = function() {
      AV.User.logOut();
      $location.path('user-login');
    };

    $scope.cUser = AV.User.current();
  });
