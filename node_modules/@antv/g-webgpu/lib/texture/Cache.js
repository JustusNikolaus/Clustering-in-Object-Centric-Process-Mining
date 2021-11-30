"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureCache = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inversify = require("inversify");

var _dec, _class, _temp;

var TextureCache = (_dec = (0, _inversify.injectable)(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function TextureCache() {
    (0, _classCallCheck2.default)(this, TextureCache);
    this.cache = {};
  }

  (0, _createClass2.default)(TextureCache, [{
    key: "get",
    value: function get(name) {
      return this.cache[name];
    }
  }, {
    key: "set",
    value: function set(name, texture) {
      this.cache[name] = texture;
    }
  }]);
  return TextureCache;
}(), _temp)) || _class);
exports.TextureCache = TextureCache;
//# sourceMappingURL=Cache.js.map