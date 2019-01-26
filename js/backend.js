'use strict';
(function () {
  var SUCCESS_CODE = 200;
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';



  var getRequestPreparation = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var save = function (data, onSuccess, onError) {
    var xhr = getRequestPreparation(onSuccess, onError);

    xhr.addEventListener('error', function () {
      onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = getRequestPreparation(onSuccess, onError);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 8500;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
