import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { Component } from '../../ComponentManager';
import { AABB } from '../../shape/AABB';
export var MeshComponent = /*#__PURE__*/function (_Component) {
  _inherits(MeshComponent, _Component);

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

    _classCallCheck(this, MeshComponent);

    _this = _super.call(this, data);
    _this.material = void 0;
    _this.geometry = void 0;
    _this.aabb = new AABB();
    _this.aabbDirty = true;
    _this.model = void 0;
    _this.visible = true;
    _this.children = [];
    Object.assign(_assertThisInitialized(_this), data);
    return _this;
  }

  return MeshComponent;
}(Component);
//# sourceMappingURL=MeshComponent.js.map