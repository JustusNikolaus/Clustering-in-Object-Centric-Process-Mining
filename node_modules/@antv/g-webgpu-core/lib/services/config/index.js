"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigService = require("./ConfigService");

Object.keys(_ConfigService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ConfigService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ConfigService[key];
    }
  });
});
//# sourceMappingURL=index.js.map