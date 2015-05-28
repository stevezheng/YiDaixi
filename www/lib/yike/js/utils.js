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
      , alert: alert
      , confirm: confirm
      , show: show
    };

    ////////////////

    function go(target, params, options) {
      $state.go(target, params, options);
    }

    function alert(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }

    function confirm(title, template) {
      return $ionicPopup.confirm({
        'title': title
        , 'template': template
        , 'okType': 'button-balanced'
      });
    }

    function show(title, template, scope, buttons) {
      return $ionicPopup.show({
        title: title
        , template: template
        , scope: scope
        , buttons: buttons
      });
    }
  }
})();
