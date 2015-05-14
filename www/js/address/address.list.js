(function () {
  'use strict';

  angular
    .module('address.list', [])
    .controller('AddressListCtrl', AddressListCtrl)

    .$inject = ['$rootScope', '$scope', '$yikeUser', '$location', '$ionicPopup'];

  /* @ngInject */
  function AddressListCtrl($rootScope, $scope, $yikeUser, $location, $ionicPopup) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '';
    $scope.query = query;
    $scope.order = {
      today: null,
      now: '请选择服务时间',
      currentCheck: null
    };
    $scope.dates = initDates();
    $scope.times = ['请选择服务时间',
      '08:00-10:00',
      '10:00-12:00',
      '12:00-14:00',
      '14:00-16:00',
      '16:00-18:00',
      '18:00-20:00',
      '20:00-22:00'];
    $scope.initCheckbox = initCheckbox;
    $scope.open = yiOpen;
    $scope.submit = submit;

    init();

    ////////////////

    function init() {
      query();
    }

    function query() {
      D('address')
        .where({user: AV.User.current()})
        .select()
        .then(function (res) {
          $scope.data = AV._.sortBy(res, function (item) {
            return -item.createdAt;
          });

          try {
            $scope.data[0].checkbox = true;
            $scope.order.currentCheck = $scope.data[0];
          } catch (ex) {
            //console.error(ex);
          }
        });
    }

    function yiOpen(target) {
      $location.path(target);
    }

    function submit(date, time, address) {
      if (time == '请选择服务时间') {
        alertPopup('提示', '请选择服务时间');
        return false;
      }

      D('order')
        .add({
          date: date
          , time: time
          , address: address
          , user: AV.User.current()
        })
        .then(function (res) {
          alertPopup('提示', '下单成功');
          $location.path('/tab/order');
        }, function (err) {
          alertPopup('提示', '下单失败');
          console.error(err);
        })
    }

    function initCheckbox(d) {
      AV._.each($scope.data, function (item) {
        item.checkbox = false;
      });

      d.checkbox = true;
      $scope.order.currentCheck = d;
    }

    function initDates() {
      var dates = [];

      $scope.order.today = moment().format('YYYY-MM-DD');

      for (var i = 0; i < 6; i++) {
        var newDate = moment().add(i, 'd').format('YYYY-MM-DD');
        dates.push(newDate);
      }

      return dates;
    }

    ////////////////

    $rootScope.$on('addAddressEvent', function (event, msg) {
      D('address')
        .where({user: AV.User.current()})
        .select()
        .then(function (res) {
          $scope.data = AV._.sortBy(res, function (item) {
            return -item.createdAt;
          });

          try {
            $scope.data[0].checkbox = true;
            $scope.order.currentCheck = $scope.data[0];
          } catch (ex) {
            //console.error(ex);
          }
        });
    });
  }
})();
