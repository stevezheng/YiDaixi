(function () {
  'use strict';

  angular
    .module('user.login', ['user.factory'])
    .controller('$yikeUserLoginCtrl', $yikeUserLogin);

  $yikeUserLogin.$inject = ['$rootScope', '$scope', '$ionicPopup', '$timeout', '$location', '$yikeUser'];

  /* @ngInject */
  function $yikeUserLogin($rootScope, $scope, $ionicPopup, $timeout, $location, $yikeUser) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '$yikeUserLogin';

    init();

    $scope.user = {};

    $scope.login = login;

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

    function login(username, password) {
      if (!username) {
        alertPopup('提示', '请输入用户名');
        return false;
      }

      if (!password) {
        alertPopup('提示', '请输入密码');
        return false;
      }

      $yikeUser.logIn(username, password, {
        success: function (user) {
          var popup = alertPopup('提示', '登录成功');
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
