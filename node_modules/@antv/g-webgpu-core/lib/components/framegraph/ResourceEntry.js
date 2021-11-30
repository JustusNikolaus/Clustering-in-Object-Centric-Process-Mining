"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceEntry = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _VirtualResource2 = require("./VirtualResource");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ResourceEntry = /*#__PURE__*/function (_VirtualResource) {
  (0, _inherits2.default)(ResourceEntry, _VirtualResource);

  var _super = _createSuper(ResourceEntry);

  function ResourceEntry() {
    var _this;

    (0, _classCallCheck2.default)(this, ResourceEntry);

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

  (0, _createClass2.default)(ResourceEntry, [{
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
}(_VirtualResource2.VirtualResource);

exports.ResourceEntry = ResourceEntry;
//# sourceMappingURL=ResourceEntry.js.map