(function () {
  'use strict';

  angular
    .module('user.reg', ['user.factory'])
    .controller('$yikeUserReg', $yikeUserReg);

  $yikeUserReg.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserReg($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '$yikeUserReg';

    $scope.user = {};

    $scope.reg = reg;

    init();

    ////////////////

    function init() {
    }

    /**
     * alert
     * @param title
     * @param template
     * @returns {Object|*}
     */
    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    function reg(username, password, rPassword) {
      if (!username) {
        alertPopup('提示', '请输入用户名');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      if (!rPassword) {
        alertPopup('提示', '请输入确认密码');
        return false;
      }

      if (rPassword !== password) {
        alertPopup('提示', '两次密码输入不一致');
        return false;
      }

      var user = new $yikeUser();

      user.set('username', username);
      user.set('password', password);

      user.signUp(null, {
        success: function (user) {
          var popup = alertPopup('提示', '注册成功');
          popup.then(function () {
            $location.path('/tab/home');
          });
          $rootScope.cUser = user;
        },
        error: function (user, err) {
          console.error(err);
        }
      });
    }
  }
})();

