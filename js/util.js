'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    isEscKeycode: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    shuffle: function (array) {
      var length = array.length;
      while (length) {
        var i = Math.floor(Math.random() * length--);
        var temp = array[length];
        array[length] = array[i];
        array[i] = temp;
      }
      return array;
    },
  };
})();
