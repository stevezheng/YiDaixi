angular.module('app.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope) {
  $scope.username = '';
  $scope.password = '';
  $scope.login = function(username, password) {
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    });

    $.post('http://localhost:8210', {username: username, password: password}, function(res) {
      console.log(res);
    })
  };
});
