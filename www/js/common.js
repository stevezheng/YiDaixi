angular.module('app.common', [])
  .controller('HomeCtrl', function($scope, $yikeUser, $location) {
    $yikeUser.permission();
    $scope.open= function(target) {
      $location.path(target);
    };

    init();

    function query() {
      D('ad')
        .limit(0, 3)
        .select()
        .then(function(res) {
          $scope.ads = res;
        });
    }

    function init() {
      query();
    }
  });

