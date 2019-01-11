'use strict';

var CONST_POSTS = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;

var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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

var getRandomElement = function (element) {
  return element[Math.floor(Math.random() * element.length)];
};

var makeCommentString = function () {
  var comment = '';
  for (var i = 0; i < getRandomNum(1, 3); i++) {
    comment += getRandomElement(commentsArray) + ' ';
  }
  return comment;
};

console.log(makeCommentString());

var makeComment = function () {
  var commentObject = {
    'avatar': 'img/avatar-' + getRandomNum(MIN_AVATARS, MAX_AVATARS + 1) + '.svg',
    'message': makeCommentString(),
    'name': getRandomElement(namesArray)
  };
  return commentObject;
};

console.log(makeComment());

var makeArrayComments = function () {
  var arrayComments = [];

  for (i = 0; i < getRandomNum(10, 19); i++) {
    arrayComments.push(makeComment());
  }

  return arrayComments;
};

var addPhotoPost = function (number) {
  var post = {
    'url': 'photos/' + (number + 1) + '.jpg',
    'likes': getRandomNum(MIN_LIKE, MAX_LIKE),
    'comments': makeArrayComments()
  };
  return post;
};

var makeArrayPosts = function () {
  var arrayPosts = [];
  for (var i = 0; i < CONST_POSTS; i++) {
    arrayPosts.push(addPhotoPost(i));
  }
  return arrayPosts;
};
