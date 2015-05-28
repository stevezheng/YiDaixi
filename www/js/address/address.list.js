(function () {
  'use strict';

  angular
    .module('address.list', [])
    .controller('AddressListCtrl', AddressListCtrl)

    .$inject = ['$rootScope', '$scope', '$yikeUser', 'order','$location', '$ionicPopup', '$ionicModal'];

  /* @ngInject */
  function AddressListCtrl($rootScope, $scope, $yikeUser, order, $location, $ionicPopup, $ionicModal) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = '';
    $scope.query = query;
    $scope.edit = edit;
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
    $scope.cities = ['厦门'];

    $scope.areas = ['思明', '湖里', '集美', '海沧', '同安', '翔安'];
    $scope.initCheckbox = initCheckbox;
    $scope.open = _open;
    $scope.submit = submit;
    $scope.update = update;

    $ionicModal.fromTemplateUrl('edit-address-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    init();

    ////////////////

    function init() {
      query();
    }

    function update(name, phone, province, city, area, address) {
      if (!name) {
        alertPopup('提示', '请输入姓名');
        return false;
      }

      if (phone.length !== 11) {
        alertPopup('提示', '请输入正确的手机号');
        return false;
      }

      if (!city) {
        alertPopup('提示', '请输入城市');
        return false;
      }

      if (!area) {
        alertPopup('提示', '请输入区域');
        return false;
      }

      if (!address) {
        alertPopup('提示', '请输入详细地址');
        return false;
      }


      D('address')
        .where({objectId: $scope.order.currentCheck.id})
        .update({
          'name': name,
          'phone': phone,
          'province': province,
          'city': city,
          'area': area,
          'address': address
        })
        .then(function (res) {
          alertPopup('提示', '更新成功');
          query();
          $scope.closeModal();
        }, function (err) {
          alertPopup('提示', '新增失败');
          console.error(err);
        });
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

    function edit() {
      $scope.editData = {
        name: $scope.order.currentCheck.get('name')
        , phone: $scope.order.currentCheck.get('phone')
        , city: $scope.order.currentCheck.get('city')
        , area: $scope.order.currentCheck.get('area')
        , address: $scope.order.currentCheck.get('address')
      };
      $scope.modal.show();
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
