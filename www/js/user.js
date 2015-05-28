angular.module('app.user', [])
  .controller('UserCtrl', function($scope, $yikeUser, $location, $yikeUtils) {
    $yikeUser.permission();

    $scope.bindCard = bindCard;
    $scope.love = love;

    $scope.logout = function() {
      AV.User.logOut();
      $location.path('user-login');
    };

    $scope.cUser = AV.User.current();

    function bindCard() {
      $yikeUtils
        .confirm('请输入实体卡卡号', '<input type="text" ng-model="card">')
        .then(function(res) {
          if (res) {
            $yikeUtils.alert('提醒', '请输入正确的实体卡卡号');
          }
        });
    }

    function love() {
      $yikeUtils.alert('提醒', '捐赠请拨打电话:0592-');
    }
  });
