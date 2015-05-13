angular.module('app.address', [])
  .controller('AddressCtrl', function ($scope, $yikeUser, $location, $ionicPopup) {
    function alertPopup(title, template) {
      return $ionicPopup.alert({
        title: title,
        template: template,
        okType: 'button-balanced'
      });
    }
    $yikeUser.permission();

    $scope.order = {
      today: null
      , now: null
      , currentCheck: null
    };

    $scope.dates = function() {
      var dates = [];

      $scope.order.today = moment().format('YYYY-MM-DD');

      for (var i = 0; i < 6; i++) {
        var newDate = moment().add(i, 'd').format('YYYY-MM-DD');
        dates.push(newDate);
      }

      return dates;
    }();

    $scope.times = ['请选择服务时间', '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'];
    $scope.order.now = '请选择服务时间';

    $scope.query = function() {
      D('address')
        .select()
        .then(function(res) {
          $scope.data = AV._.sortBy(res, function(item) {
            return -item.createdAt;
          });
          $scope.data[0].checkbox = true;
          $scope.order.currentCheck = $scope.data[0];
        })
    }();

    $scope.initCheckbox = function(d) {
      AV._.each($scope.data, function(item) {
        item.checkbox = false;
      });

      d.checkbox = true;
      $scope.order.currentCheck = d;
    };


    $scope.open = function (target) {
      $location.path(target);
    };

    $scope.submit = function(date, time, address) {
      if (time == '请选择服务时间') {
        alertPopup('提示', '请选择服务时间');
        return false;
      }

      D('order')
        .add({
          date: date
          , time: time
          , address: address
        })
        .then(function(res) {
          alertPopup('提示', '下单成功');
          $location.path('/order');
        }, function(err) {
          alertPopup('提示', '下单失败');
          console.error(err);
        })
    }
  })
  .controller('AddressAddCtrl', function ($scope, $yikeUser, $location, $ionicPopup) {
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

    $scope.cities = [ '厦门' ];

    $scope.areas = [ '思明', '湖里', '集美', '海沧', '同安', '翔安' ];

    $scope.data = {
      city: '厦门'
      , area: '思明'
    };

    $scope.submit = function(name, phone, province, city, area, address) {
      if (!name) {
        alertPopup('提示', '请输入姓名');
        return false;
      }

      if (phone.length != 11) {
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
          'name': name
          , 'phone': phone
          , 'province': province
          , 'city': city
          , 'area': area
          , 'address': address
        })
        .then(function(res) {
          alertPopup('提示', '新增成功');
          $location.path('/address');
        }, function(err) {
          alertPopup('提示', '新增失败');
          console.error(err);
        })
    };
  });
