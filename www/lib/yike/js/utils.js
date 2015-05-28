(function () {
  'use strict';

  angular
    .module('yike.utils', ['ionic'])
    .factory('$yikeUtils', $yikeUtils);

  $yikeUtils.$inject = ['$state', '$ionicPopup'];

  /* @ngInject */
  function $yikeUtils($state, $ionicPopup) {
    return {
      go: go
      , alertPopup: alertPopup
    };

    ////////////////

    function go(target, params, options) {
      $state.go(target, params, options);
    }

    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }
  }
})();
