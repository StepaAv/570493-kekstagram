'use strict';
(function () {
  var MAX_TAGS_COUNT = 5;
  var MAX_TAGS_LENGTH = 20;

  var validations = function (arr) {
    arr.forEach(function (elem) {
      var hashLength = elem.length;
      var firstLetter = elem[0];
      var errorDialog = '';
      if (elem.indexOf('#', 2) !== -1) {
        errorDialog = 'У хэштегов должны быть пробелы!';
      } else if (hashLength === 1) {
        errorDialog = 'У хэштега должно быть хотябы 2 символа';
      } else if (firstLetter !== '#') {
        errorDialog = 'Зпбыл(а)(и) знак "#" в начале тега';
      } else if (arr.length > 1) {
        for (var i = 0; i < arr.length; i++) {
          var hashtag = arr[i];
          var hashtagPrevious = arr.slice(0, i);
          if (hashtagPrevious.indexOf(hashtag) > -1) {
            errorDialog = 'Дубликация тегов, не к добру';
          }
        }
      } else if (hashLength > MAX_TAGS_LENGTH) {
        errorDialog = 'Максимальная длина хэштега равна 20 кнопочкам на клавиатуре';
      } else if (arr.length > MAX_TAGS_COUNT) {
        errorDialog = 'Максимальное кол-во хэштегов ограничено разрабодчиком и равно 5';
      }
      window.solopic.inputHashTags.setCustomValidity(errorDialog);
    });
  };

  window.solopic.inputHashTags.addEventListener('input', function (evt) {
    var elementsHashTags = evt.target.value.trim().toLowerCase().split(' ');
    validations(elementsHashTags);
  });

  /*
  window.solopic.textDescription.addEventListener('change', function (evt) {
    var lengthDesc = evt.target.value.length;
    if (lengthDesc > 0 && lengthDesc < 2) {
      window.solopic.textDescription.setCustomValidity('Маловато символов для комента');
    } else {
      window.solopic.textDescription.setCustomValidity('');
    }
  });
  */

})();
