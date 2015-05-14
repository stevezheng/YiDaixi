app.controller('UserCtrl', ['$scope', function($scope) {
  $scope.data = {};

  function query(filter) {
    return D('User')
      .query('select count(*),* from _User')
      .then(function(res) {
        console.log(res);
        $scope.data = res.results;
        $scope.$digest();
      })
  }
  query({});
}]);
