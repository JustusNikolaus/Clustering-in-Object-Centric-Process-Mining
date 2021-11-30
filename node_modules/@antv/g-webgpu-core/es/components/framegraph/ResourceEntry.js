import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { VirtualResource } from './VirtualResource';
export var ResourceEntry = /*#__PURE__*/function (_VirtualResource) {
  _inherits(ResourceEntry, _VirtualResource);

  var _super = _createSuper(ResourceEntry);

  function ResourceEntry() {
    var _this;

    _classCallCheck(this, ResourceEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.version = 0;
    _this.refs = 0;
    _this.name = void 0;
    _this.imported = void 0;
    _this.priority = void 0;
    _this.discardStart = true;
    _this.discardEnd = false;
    _this.descriptor = void 0;
    _this.resource = void 0;
    return _this;
  }

  _createClass(ResourceEntry, [{
    key: "preExecuteDestroy",

    /**
     * Lifecycles in FG's execute
     */
    value: function preExecuteDestroy() {
      this.discardEnd = true;
    }
  }, {
    key: "postExecuteDestroy",
    value: function postExecuteDestroy() {
      if (!this.imported) {// TODO: 不需要每一帧结束后都销毁资源，可以增加临时资源标志
        // this.resource.destroy();
      }
    }
  }, {
    key: "postExecuteDevirtualize",
    value: function postExecuteDevirtualize() {
      this.discardStart = false;
    }
  }, {
    key: "preExecuteDevirtualize",
    value: function preExecuteDevirtualize() {
      if (!this.imported) {//
      }
    }
  }]);

  return ResourceEntry;
}(VirtualResource);
//# sourceMappingURL=ResourceEntry.js.map