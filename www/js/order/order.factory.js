(function () {
  'use strict';

  angular
    .module('order.factory')
    .factory('order', order);

  order.$inject = [''];

  /* @ngInject */
  function order() {
    return {
      query: query
    };

    ////////////////

    function query(where, page, num) {
    }
  }
})();