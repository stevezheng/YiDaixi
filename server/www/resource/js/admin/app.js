var app = angular.module('app',['ngRoute']);
AV.initialize('9rtdr38i5zj64xo020m8x4m0g3f1e6evjkjbospon7lrs0ea', 'wsu2o1gnk2v5flopz8tg1qyb1ogwnvh8isae958z4fzzrbkp', '8ryjfzqd4gek0aqqhkhja3rk2tbzyoy4yxjib6qx6qshnv9s');

app.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'resource/views/index.html',
      controller: 'HomeCtrl'
    })
    .when('/setting', {
      templateUrl: 'resource/views/setting.html',
      controller: 'SettingCtrl'
    })
    .when('/ad', {
      templateUrl: 'resource/views/ad.html',
      controller: 'AdCtrl'
    })
    .when('/user', {
      templateUrl: 'resource/views/user.html',
      controller: 'UserCtrl'
    })
    .when('/address', {
      templateUrl: 'resource/views/address.html',
      controller: 'AddressCtrl'
    })
    .when('/item', {
      templateUrl: 'resource/views/item.html',
      controller: 'ItemCtrl'
    })
    .when('/order', {
      templateUrl: 'resource/views/order.html',
      controller: 'OrderCtrl'
    })
    .when('/pay', {
      templateUrl: 'resource/views/pay.html',
      controller: 'PayCtrl'
    })
    .when('/withdraw', {
      templateUrl: 'resource/views/withdraw.html',
      controller: 'WithdrawCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);