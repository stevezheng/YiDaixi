(function () {
  'use strict';

  angular
    .module('order.factory', [])
    .factory('order', order);

  order.$inject = [];

  /* @ngInject */
  function order() {
    var cart = [];

    return {
      query: query
      , cart: cart
    };

    ////////////////

    function query(where, page, num) {
      return D('order')
        .where(where)
        .select();
    }
  }
})();