"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ShaderModuleService = require("./ShaderModuleService");

Object.keys(_ShaderModuleService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ShaderModuleService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ShaderModuleService[key];
    }
  });
});
//# sourceMappingURL=index.js.map