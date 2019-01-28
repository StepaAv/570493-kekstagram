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
    DOUBLE_TAG: 'не должны повторяться'
  };

  var scaningForGemini = function (arr) {
    var scaningForGeminiOutcome = '';
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
      if (flag) {
        break;
      }
      for (var j = 0; j < arr.length; j++) {
        if ((arr[i].toUpperCase() === arr[j].toUpperCase()) && (i !== j)) {
          scaningForGeminiOutcome = HashtagsMessages.DOUBLE_TAG;
          flag = true;
          break;
        }
        scaningForGeminiOutcome = '';
      }
    }
    return scaningForGeminiOutcome;
  };


  var scaningLonelyLattice = function (arr) {
    var scaningLonelyLatticeOutcome = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '#') {
        scaningLonelyLatticeOutcome = HashtagsMessages.LONELY_LATTICE;
        break;
      }
    }
    return scaningLonelyLatticeOutcome;
  };

  var scaningForSpacebar = function (arr) {
    var scaningForSpacebarOutcome = '';
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if ((arr[i][j] === '#') && (!(j === 0))) {
          scaningForSpacebarOutcome = HashtagsMessages.SPACE_TAG;
          break;
        }
      }
    }
    return scaningForSpacebarOutcome;
  };

  var scaningFiveHashtags = function (arr) {
    if (arr.length > MAX_HASHTAGS_COUNT) {
      return HashtagsMessages.FIVE_TAGS;
    }
    return '';
  };

  var scaningLatticeStart = function (arr) {
    var scaningLatticeStartOutcome = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] !== '#') {
        scaningLatticeStartOutcome = HashtagsMessages.NEW_TAG_LATTICE;
        break;
      }
    }
    return scaningLatticeStartOutcome;
  };

  var scaningForMaxHashtagsLettersLength = function (arr) {
    var scaningForMaxHashtagsLettersLengthOutcome = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_LENGTH_HASHTAGS) {
        scaningForMaxHashtagsLettersLengthOutcome = HashtagsMessages.LENGTH_TAG;
        break;
      }
    }
    return scaningForMaxHashtagsLettersLengthOutcome;
  };


  var assemblingHashtagsArr = function (hashArray) {
    var assembledHashtagsArray = [
      scaningFiveHashtags(hashArray),
      scaningLonelyLattice(hashArray),
      scaningForSpacebar(hashArray),
      scaningLatticeStart(hashArray),
      scaningForMaxHashtagsLettersLength(hashArray),
      scaningForGemini(hashArray)
    ];
    return assembledHashtagsArray;
  };

  var hashInputer = function () {
    var arr = textHashtags.value.trim().split(' ');
    textHashtags.setCustomValidity(assemblingHashtagsArr(arr).join(''));
  };

  textHashtags.addEventListener('change', hashInputer);
})();
