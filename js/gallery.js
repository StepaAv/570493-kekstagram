'use strict';

(function() {
  var putInSection = document.querySelector('.pictures');
  var templateSection = document.querySelector('#picture').content.querySelector('.picture');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var loadedPhotos = [];

  var createPhoto = function(photo) {
    var postPhotoElement = templateSection.cloneNode(true);
    postPhotoElement.querySelector('.picture__img').src = photo.url;
    postPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
    postPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    postPhotoElement.addEventListener('click', window.solopic.showBigPicture(photo));

    return postPhotoElement;
  };

  var clearPhotos = function() {
    var renderedPhotos = putInSection.querySelectorAll('a.picture');
    renderedPhotos.forEach(function(pic) {
      putInSection.removeChild(pic);
    });
  };

  var renderPhotos = function(photos) {
    clearPhotos();
    var fragment = document.createDocumentFragment();
    photos.forEach(function(photo) {
      var onePhoto = createPhoto(photo);
      onePhoto.addEventListener('click', function(evt) {
        evt.preventDefault();
        window.bigPicture.show(photo);
      });
      fragment.appendChild(onePhoto);
    });
    putInSection.appendChild(fragment);
  };

  var onSuccesLoad = function(photos) {
    loadedPhotos = photos.slice(0);
    renderPhotos(photos);
  };


  var onErrorLoad = function(err) {
  // tut vse budet
  };

  window.backend.load(onSuccesLoad, onErrorLoad);


  window.gallery = {
    renderPhotos: renderPhotos,
    getLoadedPhotos: function() {
      return loadedPhotos;
    },
  };
})();
