'use strict';
(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 8501;
  var DATATYPE = 'json';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var getRequestPreparation = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DATATYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(method, url);

    return xhr;
  };

  var save = function (data, onSuccess, onError) {
    var xhr = getRequestPreparation('POST', URL_SAVE, onSuccess, onError);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = getRequestPreparation('GET', URL_LOAD, onSuccess, onError);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load,
  };
})();
