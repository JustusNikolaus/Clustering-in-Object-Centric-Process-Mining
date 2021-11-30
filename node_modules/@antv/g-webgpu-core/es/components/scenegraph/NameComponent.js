import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { Component } from '../../ComponentManager';
export var NameComponent = /*#__PURE__*/function (_Component) {
  _inherits(NameComponent, _Component);

  var _super = _createSuper(NameComponent);

  function NameComponent(data) {
    var _this;

    _classCallCheck(this, NameComponent);

    _this = _super.call(this, data);
    _this.name = void 0;
    _this.name = data.name || '';
    return _this;
  }

  return NameComponent;
}(Component);
//# sourceMappingURL=NameComponent.js.map