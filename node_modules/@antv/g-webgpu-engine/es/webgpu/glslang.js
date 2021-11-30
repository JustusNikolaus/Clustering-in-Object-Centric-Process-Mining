import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import { loadScriptAsync } from '../utils/dom';
var glslang;
export default function () {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            return loadScriptAsync('https://preview.babylonjs.com/glslang/glslang.js');

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