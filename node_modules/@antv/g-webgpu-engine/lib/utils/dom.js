"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWindowObjectExist = isWindowObjectExist;
exports.loadScript = loadScript;
exports.loadScriptAsync = loadScriptAsync;

function isWindowObjectExist() {
  return typeof window !== 'undefined';
}

function loadScript(scriptUrl, onSuccess, onError, scriptId) {
  if (!isWindowObjectExist()) {
    return;
  }

  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', scriptUrl);

  if (scriptId) {
    script.id = scriptId;
  }

  script.onload = function () {
    if (onSuccess) {
      onSuccess();
    }
  };

  script.onerror = function (e) {
    if (onError) {
      onError("Unable to load script '".concat(scriptUrl, "'"), e);
    }
  };

  head.appendChild(script);
}

function loadScriptAsync(scriptUrl, scriptId) {
  return new Promise(function (resolve, reject) {
    loadScript(scriptUrl, function () {
      resolve();
    }, function (message, exception) {
      reject(exception);
    });
  });
}
//# sourceMappingURL=dom.js.map