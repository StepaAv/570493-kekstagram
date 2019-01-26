'use strict';
(function () {
  var PHOTO_INDEX_MIN = 0;
  var PHOTO_INDEX_MAX = 10;

  var filtersBlock = document.querySelector('.img-filters');
  var imgFiltersButton = document.querySelectorAll('.img-filters__button');
  var filterPopular = document.getElementById('filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');


  var showingFilters = (function () {
    filtersBlock.classList.remove('img-filters--inactive');
  });


  var toggleActiveCalss = function (btn) {
    imgFiltersButton.forEach(function (button) {
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

  function sortDiscussedPhotos(e) {
    toggleActiveCalss(e.target);
    var filteredPhotos = window.gallery
      .getLoadedPhotos()
      .slice(0)
      .sort(function (firstPhoto, secondPhoto) {
        return secondPhoto.comments.length - firstPhoto.comments.length;
      });
    window.gallery.renderPhotos(filteredPhotos);
  }

  var debouncePopularPhotos = window.debounce(sortDefaultPhotos);
  var debounceDiscussedPhotos = window.debounce(sortDiscussedPhotos);
  var debounceNewPhotos = window.debounce(sortNewPhotos);

  filterPopular.addEventListener('click', debouncePopularPhotos);
  filterNew.addEventListener('click', debounceNewPhotos);
  filterDiscussed.addEventListener('click', debounceDiscussedPhotos);


  window.filters = {
    showingFilters: showingFilters
  };
})();
