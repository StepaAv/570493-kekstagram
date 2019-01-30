'use strict';

(function () {
  var DEBOUNCE_TIME = 501;

  var lastTimeout = null;
  window.debounce = function (cb) {

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_TIME);
    };
  };
})();
