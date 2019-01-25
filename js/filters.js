'use strict';
(function () {

  var filtersBlock = document.querySelector('.img-filters');

  var filterPopular = document.getElementById('filter-popular');
  var filterNew = document.getElementById('filter-new');
  var filterDiscussed = document.getElementById('filter-discussed');

  // var filterForm = document.querySelector('.img-filters__form');
  // var activeFilterButton = filterForm.querySelector('.img-filters__button--active');
  // var clickButton = filterForm.querySelector('button[type=button]');
  var NEW_UNIQUE_PHOTO = 10;

  var showingFilters = function () {
    filtersBlock.classList.remove('img-filters--inactive');
  }();

  var changeFilter = function () {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var sortDefaultPhotos = function (photo) {
    console.log('you clicked filter default');
    changeFilter();
    filterPopular.classList.add('img-filters__button--active');

    return photo;
  };

  var sortNewPhotos = function (photo) {
    console.log('you clicked filter new');
    changeFilter();
    filterNew.classList.add('img-filters__button--active');
    // var photoCopy = photo.slice();
    var assembledPhotosArray = [];
    var maximumIndex = photo.length - 1;
    var count = Math.min(maximumIndex, NEW_UNIQUE_PHOTO);
    for (var i = 0; i < count; i++) {
      var randomIndex = getRandomNumber(i, maximumIndex);
      var temporaryItem = photo[randomIndex];
      photo[randomIndex] = photo[i];
      photo[i] = temporaryItem;
      assembledPhotosArray.push(temporaryItem);
    }
    return assembledPhotosArray;
  };

  function sortDiscussedPhotos(photo) {
    console.log('you clicked filter hot');
    changeFilter();
    filterDiscussed.classList.add('img-filters__button--active');
    return photo.sort(function (firstPhoto, secondPhoto) {
      return secondPhoto.comments.length - firstPhoto.comments.length;
    });
  }


  filterPopular.addEventListener('click', sortDefaultPhotos);
  filterNew.addEventListener('click', sortNewPhotos);
  filterDiscussed.addEventListener('click', sortDiscussedPhotos);

})();
