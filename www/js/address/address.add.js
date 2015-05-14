(function () {
  'use strict';
  angular.module('address.add', [])
    .controller('AddressAddCtrl', function ($rootScope, $scope, $yikeUser, $location, $ionicPopup) {
      function alertPopup(title, template) {
        return $ionicPopup.alert({
          title: title,
          template: template,
          okType: 'button-balanced'
        });
      }

      $yikeUser.permission();

      $scope.open = function (target) {
        $location.path(target);
      };

      $scope.cities = ['厦门'];

      $scope.areas = ['思明', '湖里', '集美', '海沧', '同安', '翔安'];

      $scope.data = {
        city: '厦门',
        area: '思明'
      };


      $scope.submit = function (name, phone, province, city, area, address) {
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
          .add({
            'name': name,
            'phone': phone,
            'province': province,
            'city': city,
            'area': area,
            'address': address,
            'user': AV.User.current()
          })
          .then(function (res) {
            alertPopup('提示', '新增成功');
            $scope.$emit('addAddressEvent', 'success');
            $location.path('/address');
          }, function (err) {
            alertPopup('提示', '新增失败');
            console.error(err);
          });
      };
    });
})();

(function () {
  'use strict';

  angular
    .module('address.add', [])
    .controller('addressAddCtrl', addressAddCtrl);

  addressAddCtrl.$inject = ['$rootScope',
    'scope', '$yikeUser', '$location', '$ionicPopup'];

  /* @ngInject */
  function addressAddCtrl($rootScope, $scope, $yikeUser, $location, $ionicPopup) {
    /* jshint validthis: true */
    var self = this;

    self.init = init;
    self.title = 'addressAddCtrl';

    $yikeUser.permission();

    $scope.open = yiOpen;

    $scope.cities = ['厦门'];

    $scope.areas = ['思明', '湖里', '集美', '海沧', '同安', '翔安'];

    $scope.data = {
      city: '厦门',
      area: '思明'
    };


    $scope.submit = submit;

    init();

    ////////////////

    function init() {
    }

    function submit(name, phone, province, city, area, address) {
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
        .add({
          'name': name,
          'phone': phone,
          'province': province,
          'city': city,
          'area': area,
          'address': address,
          'user': AV.User.current()
        })
        .then(function (res) {
          alertPopup('提示', '新增成功');
          $scope.$emit('addAddressEvent', 'success');
          $location.path('/address');
        }, function (err) {
          alertPopup('提示', '新增失败');
          console.error(err);
        });
    }

    function yiOpen(target) {
      $location.path(target);
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


