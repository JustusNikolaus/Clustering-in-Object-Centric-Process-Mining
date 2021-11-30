"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dom = require("../utils/dom");

var glslang;

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!glslang) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", glslang);

          case 2:
            _context.next = 4;
            return (0, _dom.loadScriptAsync)('https://preview.babylonjs.com/glslang/glslang.js');

          case 4:
            glslang = window.glslang('https://preview.babylonjs.com/glslang/glslang.wasm');
            return _context.abrupt("return", glslang);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}
//# sourceMappingURL=glslang.js.map