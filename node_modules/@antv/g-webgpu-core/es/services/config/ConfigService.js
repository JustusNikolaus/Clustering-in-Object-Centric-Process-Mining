import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var _dec, _class, _temp;

import { injectable } from 'inversify';
export var ConfigService = (_dec = injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function ConfigService() {
    _classCallCheck(this, ConfigService);

    this.config = void 0;
  }

  _createClass(ConfigService, [{
    key: "get",
    value: function get() {
      return this.config;
    }
  }, {
    key: "set",
    value: function set(config) {
      this.config = config;
    }
  }]);

  return ConfigService;
}(), _temp)) || _class);
//# sourceMappingURL=ConfigService.js.map