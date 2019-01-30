'use strict';
(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var RENDER_COMMENTS_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');
  var image = document.querySelector('.big-picture__img img');
  var pictureLikes = document.querySelector('.likes-count');
  var pictureDescription = document.querySelector('.social__caption');
  var pictureComments = document.querySelector('.social__comments');

  var pressEscHandler = null;

  var textDesc = document.querySelector('.text__description');
  var inputHashTags = document.querySelector('.text__hashtags');

  var closePhoto = function () {
    bigPicture.classList.add('hidden');

    bigPictureClose.removeEventListener('click', picCloseBtn);
    document.removeEventListener('keydown', pressEscHandler);
  };

  var picCloseBtn = function (event) {
    event.preventDefault();
    closePhoto();
  };

  var createComment = function (count, comments) {
    var fragment = document.createDocumentFragment();
    comments.slice(0, 5).forEach(function (comment) {
      var socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = comment.avatar;
      avatar.title = comment.name;
      avatar.alt = 'Аватар комментатора фотографии';
      avatar.width = AVATAR_WIDTH;
      avatar.height = AVATAR_HEIGHT;
      socialComment.appendChild(avatar);

      var socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comment.message;
      socialComment.appendChild(socialText);
      fragment.appendChild(socialComment);
    });

    pictureComments.appendChild(fragment);
  };

  var openPhoto = function (photo) {
    image.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureDescription.textContent = photo.description;
    pictureComments.innerHTML = '';
    createComment(RENDER_COMMENTS_COUNT, photo.comments);
  };

  var onEscBigPictureWindow = function (e) {
    if (window.util.isEscKeycode(e)) {
      closingBigPicture();
      document.removeEventListener('keydown', onEscBigPictureWindow);
    }
  };

  var showBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bigPictureClose.addEventListener('click', closingBigPicture);
    document.addEventListener('keydown', onEscBigPictureWindow);
    openPhoto(photo);
  };

  var closingBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  window.solopic = {
    bigPicture: bigPicture,
    showBigPicture: showBigPicture,
    textDesc: textDesc,
    inputHashTags: inputHashTags,
  };
})();
