YikeModule

.factory('$yikeUser', ['$rootScope', function($rootScope) {
    return AV.Object.extend('_User', {
      sayHi: function() {
        console.log('hi');
      }
    }, {
    });
  }])