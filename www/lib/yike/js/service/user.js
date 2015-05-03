YikeModule

.factory('$yikeUser', [function() {
    return AV.Object.extend('_User', {
      sayHi: function() {
        console.log('hi');
      },
    }, {
      isLogin: function() {
        var self = this;
        var cUser = self.current();
        if (cUser) {
          console.log('已经登录');
          return true;
        } else {
          console.log('尚未登录');
          return false;
        }
      }
    });
  }])