'use strict';

var CONST_POSTS = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;
var MIN_COMMENTS_STRING = 1;
var MAX_COMMENTS_STRING = 2;
var MIN_COMMENTS_ARRAY = 10;
var MAX_COMMENTS_ARRAY = 20;

var putInSection = document.querySelector('.pictures');
var templateSection = document.querySelector('#picture').content.querySelector('.picture');

var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var namesArray = [
  'Liuda',
  'xxxNAGIBATORxxx',
  'ScrappyCoco78',
  'Giuvento Manochi',
  'Sania_3ato4ka',
  'ActivateWindows',
];

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomSegment = function (element) {
  return element[Math.floor(Math.random() * element.length)];
};

var makeCommentString = function () {
  var comment = '';
  for (var i = 0; i < getRandomNum(MIN_COMMENTS_STRING, MAX_COMMENTS_STRING); i++) {
    comment += getRandomSegment(commentsArray) + ' ';
  }
  return comment;
};

var constructOneComment = function () {
  var commentObject = {
    avatar: 'img/avatar-' + getRandomNum(MIN_AVATARS, MAX_AVATARS + 1) + '.svg',
    message: makeCommentString(),
    name: getRandomSegment(namesArray),
  };
  return commentObject;
};

var makeArrayOfComments = function () {
  var arrayComments = [];
  for (var i = 0; i < getRandomNum(MIN_COMMENTS_ARRAY, MAX_COMMENTS_ARRAY); i++) {
    arrayComments.push(constructOneComment());
  }

  return arrayComments;
};

var addPostPhoto = function (number) {
  var post = {
    url: 'photos/' + (number + 1) + '.jpg',
    likes: getRandomNum(MIN_LIKE, MAX_LIKE),
    comments: makeArrayOfComments(),
  };
  return post;
};

var makePostsArray = function () {
  var arrayPosts = [];
  for (var i = 0; i < CONST_POSTS; i++) {
    arrayPosts.push(addPostPhoto(i));
  }
  return arrayPosts;
};

var assemblingPostPhoto = function (photo) {
  var postPhotoElement = templateSection.cloneNode(true);
  postPhotoElement.querySelector('.picture__img').src = photo.url;
  postPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
  postPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return postPhotoElement;
};

var initPostPhotoArray = function () {
  var makePosts = makePostsArray();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < CONST_POSTS; i++) {
    fragment.appendChild(assemblingPostPhoto(makePosts[i]));
  }
  putInSection.appendChild(fragment);
};

initPostPhotoArray();

// DOMASKA NOMER CHETYRE
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


var uploadInput = document.querySelector('#upload-file');

var uploadPhotoOpen = document.getElementById('upload-file');
var uploadPhotoClose = document.getElementById('upload-cancel');
var uploadPhotoForm = document.querySelector('.img-upload__overlay');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUpload();
  }
};

var onUploadInputChange = function (e) {
  openUpload();
};

uploadInput.addEventListener('change', onUploadInputChange);


var openUpload = function () {
  uploadPhotoForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeUpload = function () {
  uploadPhotoForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


uploadPhotoClose.addEventListener('click', function () {
  closeUpload();
});

uploadPhotoClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUpload();
  }
});


var zoomPhotoPlus = document.querySelector('.scale__control--bigger');
var zoomPhotoMinus = document.querySelector('.scale__control--smaller');
var zoomPhotoValue = document.querySelector('.scale__control--value');
var imageScale = document.querySelector('.img-upload__preview');

imageScale.style.transform = 'scale(1)';
zoomPhotoValue.value = '100%';

var IMG_SCALE_STEP = 25;
var IMG_MAX_SCALE = 100;
var IMG_MIN_SCALE = 25;
var imgScale = 100;

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

// FILTERS

var mainImage = document.querySelector('.img-upload__preview > img');
var filterNone = document.getElementById('effect-none');
var filterChrome = document.getElementById('effect-chrome');
var filterSepia = document.getElementById('effect-sepia');
var filterMarvin = document.getElementById('effect-marvin');
var filterPhobos = document.getElementById('effect-phobos');
var filterHeat = document.getElementById('effect-heat');

var addingStyleNone = function () {
  mainImage.classList.remove('effects__preview--chrome',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat',
      'effects__preview--sepia');
};
var addingStyleChrome = function () {
  addingStyleNone();
  mainImage.classList.add('effects__preview--chrome');
};
var addingStyleMarvin = function () {
  addingStyleNone();
  mainImage.classList.add('effects__preview--marvin');
};
var addingStylePhobos = function () {
  addingStyleNone();
  mainImage.classList.add('effects__preview--phobos');
};
var addingStyleHeat = function () {
  addingStyleNone();
  mainImage.classList.add('effects__preview--heat');
};
var addingStyleSepia = function () {
  addingStyleNone();
  mainImage.classList.add('effects__preview--sepia');
};

filterChrome.addEventListener('click', addingStyleChrome);
filterSepia.addEventListener('click', addingStyleSepia);
filterMarvin.addEventListener('click', addingStyleMarvin);
filterPhobos.addEventListener('click', addingStylePhobos);
filterHeat.addEventListener('click', addingStyleHeat);
filterNone.addEventListener('click', addingStyleNone);


var effectLevelHandle = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');

effectLevelHandle.addEventListener('mousedown', function (evt) {
  // evt.preventDeafault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };
    // pikseli rezultat ----------- nachalnaja pozicija ----smeschenije
    effectLevelHandle.style.left = (effectLevelHandle.offsetLeft - shift.x) + 'px';
    effectLevelDepth.style.width = (effectLevelHandle.offsetLeft - shift.x) + 'px';
  };


  var onMouseUp = function (upEvt) {
    upEvt.preventDeafault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
