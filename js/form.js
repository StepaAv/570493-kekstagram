'use strict';

(function () {
  var COEF_CHROME = 100;
  var COEF_SEPIA = 100;
  var COEF_MARVIN = '%';
  var COEF_PHOBOS = 33.3;
  var COEF_HEAT = 33.3;

  var IMG_SCALE_STEP = 25;
  var IMG_MAX_SCALE = 100;
  var IMG_MIN_SCALE = 25;
  var imgScale = 100;

  var uploadInput = document.querySelector('#upload-file');
  var uploadPhotoClose = document.getElementById('upload-cancel');
  var uploadPhotoForm = document.querySelector('.img-upload__overlay');
  var textAreaInput = document.querySelector('.text__description');
  var hashTagsInput = document.querySelector('.text__hashtags');

  var mainImage = document.querySelector('.img-upload__preview > img');
  var filterNone = document.getElementById('effect-none');
  var filterChrome = document.getElementById('effect-chrome');
  var filterSepia = document.getElementById('effect-sepia');
  var filterMarvin = document.getElementById('effect-marvin');
  var filterPhobos = document.getElementById('effect-phobos');
  var filterHeat = document.getElementById('effect-heat');
  var effectList = document.querySelector('.effects__list');
  var effectBar = document.querySelector('.img-upload__effect-level');

  var effectLevelHandle = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var main = document.querySelector('main');
  var imgUploadWrapper = document.querySelector('.img-upload__wrapper');
  var form = imgUploadWrapper.querySelector('.img-upload__form');
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;

  var zoomPhotoPlus = document.querySelector('.scale__control--bigger');
  var zoomPhotoMinus = document.querySelector('.scale__control--smaller');
  var zoomPhotoValue = document.querySelector('.scale__control--value');
  var imageScale = document.querySelector('.img-upload__preview');

  var currentFilter;

  var scaleRestoring = function () {
    var i = 0;
    do {
      i += 1;
      zoomPhotoPlus.click();
    }
    while (i < 5);
  };


  var openUpload = function () {
    uploadPhotoForm.classList.remove('hidden');
    addingStyleNone();
    document.addEventListener('keydown', onPopupEscPress);
  };
  uploadInput.addEventListener('change', openUpload);

  var closeUpload = function () {
    uploadInput.value = '';
    uploadPhotoForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    scaleRestoring();
  };

  uploadPhotoClose.addEventListener('click', function () {
    closeUpload();
  });

  var onPopupEscPress = function (evt) {
    if (window.util.isEscKeycode(evt)) {
      closeUpload();
    }
  };

  uploadPhotoClose.addEventListener('keydown', function (evt) {
    if (window.util.isEscKeycode(evt)) {
      closeUpload();
    }
  });

  textAreaInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  hashTagsInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  imageScale.style.transform = 'scale(1)';
  zoomPhotoValue.value = '100%';

  var plusImgScale = function () {
    var scale = imgScale + IMG_SCALE_STEP;
    if (scale > IMG_MAX_SCALE) {
      scale = IMG_MAX_SCALE;
    }

    imgScale = scale;
    zoomPhotoValue.value = scale + '%';
    imageScale.style.transform = 'scale(' + scale / 100 + ')';
  };

  zoomPhotoPlus.addEventListener('click', plusImgScale);

  var minusImgScale = function () {
    var scale = imgScale - IMG_SCALE_STEP;
    if (scale < IMG_SCALE_STEP) {
      scale = IMG_MIN_SCALE;
    }

    imgScale = scale;
    zoomPhotoValue.value = scale + '%';
    imageScale.style.transform = 'scale(' + scale / 100 + ')';
  };

  zoomPhotoMinus.addEventListener('click', minusImgScale);

  var addingStyleNone = function () {
    mainImage.classList.remove(
        'effects__preview--chrome',
        'effects__preview--marvin',
        'effects__preview--phobos',
        'effects__preview--heat',
        'effects__preview--sepia'
    );
    mainImage.style.filter = '';
    removingEffectBar();
  };

  var removingEffectBar = function () {
    effectBar.classList.add('hidden');
  };

  var addingEffectBar = function () {
    effectBar.classList.remove('hidden');
  };

  var setFilter = function (filter, style) {
    addingStyleNone();
    addingEffectBar();
    effectLevelHandle.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    mainImage.style.filter = filter;
    mainImage.classList.add(style);
  };

  var addingStyleChrome = function () {
    setFilter('grayscale(1)', 'effects__preview--chrome');
  };
  var addingStyleMarvin = function () {
    setFilter('invert(100%)', 'effects__preview--marvin');
  };
  var addingStylePhobos = function () {
    setFilter('blur(3px)', 'effects__preview--phobos');
  };
  var addingStyleHeat = function () {
    setFilter('brightness(3)', 'effects__preview--heat');
  };
  var addingStyleSepia = function () {
    setFilter('sepia(1)', 'effects__preview--sepia');
  };

  effectLevelHandle.addEventListener('mousedown', function (evt) {
    var maxWidth = effectLevelLine.offsetWidth;

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var offset = effectLevelHandle.offsetLeft - shift.x;
      if (offset > maxWidth) {
        offset = maxWidth;
      }
      if (offset < 0) {
        offset = 0;
      }
      effectLevelHandle.style.left = offset + 'px';
      effectLevelDepth.style.width = offset + 'px';

      var calculatingEffectValue = function () {
        var percentage = (offset * 100) / maxWidth;
        var newLevelValue = Math.round(percentage);
        return newLevelValue;
      };
      var num = calculatingEffectValue();
      setCurrentFilterValue(num);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setCurrentFilterValue = function (num) {
    currentFilter = effectList.querySelector('input[type=radio]:checked');

    switch (currentFilter.value) {
      case filterChrome.value:
        mainImage.style.filter = 'grayscale(' + num / COEF_CHROME + ')';
        break;
      case filterSepia.value:
        mainImage.style.filter = 'sepia(' + num / COEF_SEPIA + ')';
        break;
      case filterMarvin.value:
        mainImage.style.filter = 'invert(' + num + COEF_MARVIN + ')';
        break;
      case filterPhobos.value:
        mainImage.style.filter = 'blur(' + num / COEF_PHOBOS + 'px' + ')';
        break;
      case filterHeat.value:
        var mathHeatSumm = num / COEF_HEAT;
        mathHeatSumm = mathHeatSumm < 1 ? 1 : mathHeatSumm;
        mainImage.style.filter = 'brightness(' + mathHeatSumm + ')';
        break;
      default:
        break;
    }
  };

  filterChrome.addEventListener('click', addingStyleChrome);
  filterSepia.addEventListener('click', addingStyleSepia);
  filterMarvin.addEventListener('click', addingStyleMarvin);
  filterPhobos.addEventListener('click', addingStylePhobos);
  filterHeat.addEventListener('click', addingStyleHeat);
  filterNone.addEventListener('click', addingStyleNone);

  var closingModalWithEsc = function (evt) {
    if (window.util.isEscKeycode(evt)) {
      closeModalWindow();
    }
  };

  var closeModalWindow = function () {
    var okSection = document.querySelector('.success');
    var notOkSection = document.querySelector('.error');
    if (main.contains(okSection)) {
      removeModalWindowListener(okSection, closeUpload);
      scaleRestoring();
    } else if (main.contains(notOkSection)) {
      removeModalWindowListener(notOkSection, closingModalWithEsc);
      scaleRestoring();
    }
  };

  var removeModalWindowListener = function (section, listener) {
    main.removeChild(section);
    main.removeEventListener('click', anuBtnClickHandler);
    document.removeEventListener('keydown', listener);
  };

  var successingSaveForm = function () {
    closeUpload();
    var successMarkup = successTemplate.cloneNode(true);
    main.appendChild(successMarkup);
  };

  var errorSaveForm = function () {
    closeUpload();
    var errorMarkup = errorTemplate.cloneNode(true);
    main.appendChild(errorMarkup);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successingSaveForm, errorSaveForm);
    evt.preventDefault();
    main.addEventListener('click', anuBtnClickHandler);
    document.addEventListener('keydown', closingModalWithEsc);
  });

  var anuBtnClickHandler = function (evt) {
    var target = evt.target;
    if (
      target.className === 'success__button' ||
      target.className === 'success' ||
      target.className === 'error__button' ||
      target.className === 'error'
    ) {
      closeModalWindow();
    }
  };
})();
