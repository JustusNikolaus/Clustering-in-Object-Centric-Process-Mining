"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IteractorService = require("./IteractorService");

Object.keys(_IteractorService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IteractorService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IteractorService[key];
    }
  });
});
//# sourceMappingURL=index.js.map