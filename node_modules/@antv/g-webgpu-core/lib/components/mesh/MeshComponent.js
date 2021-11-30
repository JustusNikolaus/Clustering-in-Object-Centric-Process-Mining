"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ComponentManager = require("../../ComponentManager");

var _AABB = require("../../shape/AABB");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MeshComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MeshComponent, _Component);

  var _super = _createSuper(MeshComponent);

  /**
   * aabb 应该存在 Mesh 而非 Geometry 中，原因包括：
   * 1. 包围盒会受 transform 影响。例如每次 transform 之后应该重新计算包围盒（center 发生偏移）。
   * 2. 多个 Mesh 可以共享一个 Geometry，但可以各自拥有不同的 aabb
   */

  /**
   * transform 之后需要重新计算包围盒
   */

  /**
   * 实际渲染 Model
   */
  function MeshComponent(data) {
    var _this;

    (0, _classCallCheck2.default)(this, MeshComponent);
    _this = _super.call(this, data);
    _this.material = void 0;
    _this.geometry = void 0;
    _this.aabb = new _AABB.AABB();
    _this.aabbDirty = true;
    _this.model = void 0;
    _this.visible = true;
    _this.children = [];
    Object.assign((0, _assertThisInitialized2.default)(_this), data);
    return _this;
  }

  return MeshComponent;
}(_ComponentManager.Component);

exports.MeshComponent = MeshComponent;
//# sourceMappingURL=MeshComponent.js.map