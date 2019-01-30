'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_LENGTH_HASHTAGS = 20;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');

  var HashtagsMessages = {
    FIVE_TAGS: 'Не должно превышать 5',
    LONELY_LATTICE: 'не должен состоять только из #',
    SPACE_TAG: 'Хэш-теги разделяются пробелами',
    NEW_TAG_LATTICE: 'должен начинаться с #',
    LENGTH_TAG: 'не должно быть символов больше 20',
    DOUBLE_TAG: 'не должны повторяться',
  };

  var coloringBorderOnError = function () {
    textHashtags.style.border = '3px solid red';
  };

  var scaningForGemini = function (arr) {
    var geminiResult = arr
      .map(function (el) {
        return el.toUpperCase();
      })
      .some(function (el, i, array) {
        return array.indexOf(el) !== i;
      });

    if (geminiResult) {
      coloringBorderOnError();
      return HashtagsMessages.DOUBLE_TAG;
    }

    return '';
  };

  var scaningLonelyLattice = function (arr) {
    var lonelyLattice = arr.some(function (el) {
      return el === '#';
    });

    if (lonelyLattice) {
      coloringBorderOnError();
      return HashtagsMessages.LONELY_LATTICE;
    }

    return '';
  };

  var scaningFiveHashtags = function (arr) {
    if (arr.length > MAX_HASHTAGS_COUNT) {
      coloringBorderOnError();
      return HashtagsMessages.FIVE_TAGS;
    }
    return '';
  };

  var scaningLatticeStart = function (arr) {
    var latticeStart = arr.some(function (tag) {
      return tag[0] !== '#';
    });

    if (latticeStart) {
      coloringBorderOnError();
      return HashtagsMessages.NEW_TAG_LATTICE;
    }

    return '';
  };

  var scaningForMaxHashtagsLettersLength = function (arr) {
    var maxHashtagsLettersLength = arr.some(function (el) {
      return el.length > MAX_LENGTH_HASHTAGS;
    });
    if (maxHashtagsLettersLength) {
      coloringBorderOnError();
      return HashtagsMessages.LENGTH_TAG;
    }

    return '';
  };

  var assemblingHashtagsArr = function (hashArray) {
    var assembledHashtagsArray = [
      scaningFiveHashtags(hashArray),
      scaningLonelyLattice(hashArray),
      scaningLatticeStart(hashArray),
      scaningForMaxHashtagsLettersLength(hashArray),
      scaningForGemini(hashArray),
    ];
    return assembledHashtagsArray;
  };

  var onChangeHashInputer = function () {
    textHashtags.style.border = 'none';
    var arr = textHashtags.value
      .trim()
      .split(' ')
      .filter(function (el) {
        return el !== '';
      });
    textHashtags.setCustomValidity(assemblingHashtagsArr(arr).join(''));
  };

  textHashtags.addEventListener('change', onChangeHashInputer);
})();
