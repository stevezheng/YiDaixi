angular.module('app.user', [])
  .controller('UserCtrl', ['$scope', '$yikeUser', function($scope, $yikeUser) {
    var user = new $yikeUser();
    user.sayHi();
  }])
