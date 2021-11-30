"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CullableComponent = exports.Strategy = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ComponentManager = require("../../ComponentManager");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#changing-mesh-culling-strategy
 */
var Strategy;
exports.Strategy = Strategy;

(function (Strategy) {
  Strategy[Strategy["Standard"] = 0] = "Standard";
})(Strategy || (exports.Strategy = Strategy = {}));

var CullableComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CullableComponent, _Component);

  var _super = _createSuper(CullableComponent);

  function CullableComponent(data) {
    var _this;

    (0, _classCallCheck2.default)(this, CullableComponent);
    _this = _super.call(this, data);
    _this.strategy = Strategy.Standard;
    _this.visibilityPlaneMask = 0;
    _this.visible = false;
    Object.assign((0, _assertThisInitialized2.default)(_this), data);
    return _this;
  }

  return CullableComponent;
}(_ComponentManager.Component);

exports.CullableComponent = CullableComponent;
//# sourceMappingURL=CullableComponent.js.map