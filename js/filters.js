'use strict';
(function () {
  var PHOTO_INDEX_MIN = 0;
  var PHOTO_INDEX_MAX = 10;

  var filtersBlock = document.querySelector('.img-filters');
  var imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');

  var show = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  };

  var toggleActiveCalss = function (btn) {
    imgFiltersButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    btn.classList.add('img-filters__button--active');
  };

  var sortDefaultPhotos = function (e) {
    toggleActiveCalss(e.target);
    var filteredPhotos = window.gallery.getLoadedPhotos().slice(0);
    window.gallery.renderPhotos(filteredPhotos);
  };

  var sortNewPhotos = function (e) {
    toggleActiveCalss(e.target);
    var assembledPhotosArray = window.gallery.getLoadedPhotos().slice(0);
    var filteredPhotos = window.util.shuffle(assembledPhotosArray).slice(PHOTO_INDEX_MIN, PHOTO_INDEX_MAX);
    window.gallery.renderPhotos(filteredPhotos);
  };

  var sortDiscussedPhotos = function (e) {
    toggleActiveCalss(e.target);
    var filteredPhotos = window.gallery
      .getLoadedPhotos()
      .slice(0)
      .sort(function (firstPhoto, secondPhoto) {
        return secondPhoto.comments.length - firstPhoto.comments.length;
      });
    window.gallery.renderPhotos(filteredPhotos);
  };

  filterPopular.addEventListener('click', window.debounce(sortDefaultPhotos));
  filterNew.addEventListener('click', window.debounce(sortNewPhotos));
  filterDiscussed.addEventListener('click', window.debounce(sortDiscussedPhotos));

  window.filters = {
    show: show,
  };
})();
