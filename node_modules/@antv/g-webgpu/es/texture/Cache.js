import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var _dec, _class, _temp;

import { injectable } from 'inversify';
export var TextureCache = (_dec = injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function TextureCache() {
    _classCallCheck(this, TextureCache);

    this.cache = {};
  }

  _createClass(TextureCache, [{
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
//# sourceMappingURL=Cache.js.map