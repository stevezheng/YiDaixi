AV.initialize(
  '9rtdr38i5zj64xo020m8x4m0g3f1e6evjkjbospon7lrs0ea',
  'wsu2o1gnk2v5flopz8tg1qyb1ogwnvh8isae958z4fzzrbkp',
  '8ryjfzqd4gek0aqqhkhja3rk2tbzyoy4yxjib6qx6qshnv9s');

angular.module('app', ['ngRoute', 'ad', 'address', 'home', 'setting', 'user', 'item', 'order', 'pay', 'withdraw'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'resource/views/index.html',
        controller: 'HomeListCtrl'
      })
      .when('/setting', {
        templateUrl: 'resource/views/setting.html',
        controller: 'SettingListCtrl'
      })
      .when('/ad', {
        templateUrl: 'resource/views/ad.html',
        controller: 'AdListCtrl'
      })
      .when('/user', {
        templateUrl: 'resource/views/user.html',
        controller: 'UserListCtrl'
      })
      .when('/address', {
        templateUrl: 'resource/views/address.html',
        controller: 'AddressListCtrl'
      })
      .when('/item', {
        templateUrl: 'resource/views/item.html',
        controller: 'ItemListCtrl'
      })
      .when('/order', {
        templateUrl: 'resource/views/order.html',
        controller: 'OrderListCtrl'
      })
      .when('/pay', {
        templateUrl: 'resource/views/pay.html',
        controller: 'PayListCtrl'
      })
      .when('/withdraw', {
        templateUrl: 'resource/views/withdraw.html',
        controller: 'WithdrawListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);