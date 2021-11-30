import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { Component } from '../../ComponentManager';

/**
 * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#changing-mesh-culling-strategy
 */
export var Strategy;

(function (Strategy) {
  Strategy[Strategy["Standard"] = 0] = "Standard";
})(Strategy || (Strategy = {}));

export var CullableComponent = /*#__PURE__*/function (_Component) {
  _inherits(CullableComponent, _Component);

  var _super = _createSuper(CullableComponent);

  function CullableComponent(data) {
    var _this;

    _classCallCheck(this, CullableComponent);

    _this = _super.call(this, data);
    _this.strategy = Strategy.Standard;
    _this.visibilityPlaneMask = 0;
    _this.visible = false;
    Object.assign(_assertThisInitialized(_this), data);
    return _this;
  }

  return CullableComponent;
}(Component);
//# sourceMappingURL=CullableComponent.js.map