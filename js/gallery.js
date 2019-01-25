'use strict';

(function () {


  var putInSection = document.querySelector('.pictures');
  var templateSection = document.querySelector('#picture').content.querySelector('.picture');
  var renderedPhotos = [];


  var assemblingPostPhoto = function (photo) {
    var postPhotoElement = templateSection.cloneNode(true);
    postPhotoElement.querySelector('.picture__img').src = photo.url;
    postPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
    postPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    postPhotoElement.addEventListener('click', window.solopic.showBigPicture(photo));

    return postPhotoElement;
  };


  window.backend.load(function (photo) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.length; i++) {
      fragment.appendChild(assemblingPostPhoto(photo[i]));
    }
    putInSection.appendChild(fragment);
  });

  // function renderPhotos(photo) {
  //   var fragment = document.createDocumentFragment();
  //   photo.forEach(function (item) {
  //     var onePhoto = createPhoto(item);
  //     onePhoto.addEventListener('click', function (evt) {
  //       evt.preventDefault();
  //       window.bigPicture.show(item);
  //     });
  //     renderedPhotos.push(onePhoto);
  //     fragment.appendChild(onePhoto);
  //   });
  //   putInSection.appendChild(fragment);
  // }


})();
