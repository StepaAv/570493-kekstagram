'use strict';

(function () {

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
})();
