(function () {
  'use strict';

  angular
    .module('address.list', [])
    .controller('AddressListCtrl', AddressListCtrl)

    .$inject = ['$rootScope', '$scope', '$yikeUser', 'order','$location', '$ionicPopup'];

  /* @ngInject */
  function AddressListCtrl($rootScope, $scope, $yikeUser, order, $location, $ionicPopup) {
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
    $scope.open = _open;
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

          $scope.$digest();
        });
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

    function _open(target) {
      $location.path(target);
    }

    function submit(date, time, address) {
      if (time === '请选择服务时间') {
        alertPopup('提示', '请选择服务时间');
        return false;
      }

      var cart = []
        , cost = 0;

      for (var i = 0; i < order.cart.length; i++) {
        var obj = order.cart[i];
        var o = {
          'name': obj.get('name')
          , 'price': obj.get('price')
          , 'image': obj.get('image')
          , 'count': obj.count
        };

        cost += Number(o.price) * Number(o.count);

        cart.push(o);
      }

      D('order')
        .add({
          date: date
          , time: time
          , address: address
          , user: AV.User.current()
          , item: cart
          , cost: cost
          , status: 0
        }, (new AV.ACL(AV.User.current())))
        .then(function () {
          alertPopup('下单成功', '<p>服务时间:'+date+'</p><p>服务时段:'+time+'</p>');
          $location.path('/tab/order');
        }, function (err) {
          alertPopup('提示', '下单失败');
          console.error(err);
        });
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
