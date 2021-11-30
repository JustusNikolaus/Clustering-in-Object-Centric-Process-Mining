"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isType = _interopRequireDefault(require("./is-type"));

var _default = function _default(value) {
  return Array.isArray ? Array.isArray(value) : (0, _isType.default)(value, 'Array');
};

exports.default = _default;
//# sourceMappingURL=is-array.js.map