'use strict';

(function() {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscKeycode: function(evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    shuffle: function(array) {
      var m = array.length;
      while (m) {
        var i = Math.floor(Math.random() * m--);
        var t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
  };
})();
