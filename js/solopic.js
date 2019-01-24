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
  var commentsList = bigPicture.querySelector('.social__comments');
  var commentsCounter = document.querySelector('.social__comment-count');
  var pictureComments = document.querySelector('.social__comments');
  var commentsLoaderButton = document.querySelector('.social__comments-loader');


  var pressEscButtonHandler = null;
  var renderedCommentsCount = 0;
  var displayedPhotoData = null;

  var setEscHandler = function (handler) {
    pressEscButtonHandler = handler(closePhoto);
  }

  var closePhoto = function () {
    bigPicture.classList.add('hidden');
    renderedCommentsCount = 0;

    bigPictureClose.removeEventListener('click', picCloseBtn);
    document.removeEventListener('keydown', pressEscButtonHandler);
    // window.filters.activate();
  }

  var picCloseBtn = function (event) {
    event.preventDefault();
    closePhoto();
  }



  var updateCommentsCount = function (totalComments, renderedComments) {
    commentsCounter.innerHTML = '';
    var rendered = document.createTextNode(renderedComments + ' из ');
    var total = document.createElement('span');
    total.textContent = totalComments;
    total.classList.add('comments-count');
    commentsCounter.appendChild(rendered);
    commentsCounter.appendChild(total);
  }

  var createComment = function (count, comments) {
    var fragment = document.createDocumentFragment();
    count += renderedCommentsCount;
    for (var i = renderedCommentsCount; i < count; i++) {
      if (!comments[i]) {
        commentsLoaderButton.classList.add('hidden');
        break;
      }
      var socialComment = document.createElement('li');
      socialComment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = comments[i].avatar;
      avatar.title = comments[i].name;
      avatar.alt = 'Аватар комментатора фотографии';
      avatar.width = AVATAR_WIDTH;
      avatar.height = AVATAR_HEIGHT;
      socialComment.appendChild(avatar);

      var socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = comments[i].message;
      socialComment.appendChild(socialText);
      pictureComments.appendChild(socialComment);
      renderedCommentsCount++;
    }
    pictureComments.appendChild(fragment);
  }


  var openPhoto = function (photo) {
    image.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureDescription.textContent = photo.description;
    displayedPhotoData = photo;
    pictureComments.innerHTML = '';

    createComment(RENDER_COMMENTS_COUNT, photo.comments);

    bigPictureClose.addEventListener('click', picCloseBtn);
    document.addEventListener('keydown', pressEscButtonHandler);

    bigPicture.classList.remove('hidden');
    // window.filters.deactivate();
  }


  // delete default comentariji
  // pictureComments.innerHTML = '';

  var showBigPicture = function (bigPictureItem) {
    bigPicture.classList.remove('hidden');
    return bigPicture;
  };

  // zakrytije fotochki bolshoj kotoraja
  var closingBigPicture = function () {
    bigPicture.classList.add('hidden');
  };
  bigPictureClose.addEventListener('click', closingBigPicture);
  document.addEventListener('keydown', function (evt) {

    if (window.util.isEscKeycode(evt)) {
      closingBigPicture();
    }
  });
  window.solopic = {
    bigPicture: bigPicture,
    showBigPicture: showBigPicture
  };


})();
