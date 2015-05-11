AV.initialize('9rtdr38i5zj64xo020m8x4m0g3f1e6evjkjbospon7lrs0ea', 'wsu2o1gnk2v5flopz8tg1qyb1ogwnvh8isae958z4fzzrbkp');
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'yike', 'app.common', 'app.item', 'app.order', 'app.user', 'app.address'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    //这里对android进行一些配置,为了保证ios和安卓平台显示效果一致
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('tab.item-piece', {
        url: '/item/piece',
        views: {
          'tab-home': {
            templateUrl: 'templates/item-piece.html',
            controller: 'ItemPieceCtrl'
          }
        }
      })

      .state('tab.item-bag', {
        url: '/item/bag',
        views: {
          'tab-home': {
            templateUrl: 'templates/item-bag.html',
            controller: 'ItemBagCtrl'
          }
        }
      })

      .state('tab.order', {
        url: '/order',
        views: {
          'tab-order': {
            templateUrl: 'templates/tab-order.html',
            controller: 'OrderCtrl'
          }
        }
      })
      .state('tab.order-detail', {
        url: '/order/:chatId',
        views: {
          'tab-order': {
            templateUrl: 'templates/order-detail.html',
            controller: 'OrderDetailCtrl'
          }
        }
      })

      .state('tab.user', {
        url: '/user',
        views: {
          'tab-user': {
            templateUrl: 'templates/tab-user.html',
            controller: '$yikeUserCtrl'
          }
        }
      })

      .state('address', {
        url: '/address',
        templateUrl: 'templates/address.html',
        controller: 'AddressCtrl'
      })

      .state('address-add', {
        url: '/address/add',
        templateUrl: 'templates/address-add.html',
        controller: 'AddressAddCtrl'
      })

      .state('user-login', {
        url: '/user-login',
            templateUrl: 'templates/user-login.html',
            controller: '$yikeUserLoginCtrl'
      })

      .state('user-reg', {
        url: '/user-reg',
            templateUrl: 'templates/user-reg.html',
            controller: '$yikeUserRegCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
