import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { mat4, quat, vec3 } from 'gl-matrix';
import { Component } from '../../ComponentManager';
export var TransformComponent = /*#__PURE__*/function (_Component) {
  _inherits(TransformComponent, _Component);

  var _super = _createSuper(TransformComponent);

  /**
   * local space RTS
   */

  /**
   * XMFLOAT4X4._41
   * @see https://docs.microsoft.com/en-us/windows/win32/api/directxmath/nf-directxmath-xmfloat4x4-xmfloat4x4(constfloat)#remarks
   */

  /**
   * world space RTS
   */
  // 高阶函数，利用闭包重复利用临时变量
  // @see playcanvas graph node

  /**
   * @see https://docs.microsoft.com/en-us/windows/win32/api/directxmath/nf-directxmath-xmquaternionrotationrollpitchyaw
   */

  /**
   * @see https://xiaoiver.github.io/coding/2018/12/28/Camera-%E8%AE%BE%E8%AE%A1-%E4%B8%80.html
   */

  /**
   * TODO: 支持以下两种：
   * * translate(x, y, z)
   * * translate(vec3(x, y, z))
   */

  /**
   * @see https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
   */
  // public catmullRom = (() => {
  //   const aS = vec3.create();
  //   const aR = quat.create();
  //   const aT = vec3.create();
  //   const bS = vec3.create();
  //   const bR = quat.create();
  //   const bT = vec3.create();
  //   const cS = vec3.create();
  //   const cR = quat.create();
  //   const cT = vec3.create();
  //   const dS = vec3.create();
  //   const dR = quat.create();
  //   const dT = vec3.create();
  //   const R = quat.create();
  //   return (
  //     a: TransformComponent,
  //     b: TransformComponent,
  //     c: TransformComponent,
  //     d: TransformComponent,
  //     t: number,
  //   ) => {
  //     this.setDirty();
  //     mat4.getScaling(aS, a.worldTransform);
  //     mat4.getTranslation(aT, a.worldTransform);
  //     mat4.getRotation(aR, a.worldTransform);
  //     mat4.getScaling(bS, b.worldTransform);
  //     mat4.getTranslation(bT, b.worldTransform);
  //     mat4.getRotation(bR, b.worldTransform);
  //     mat4.getScaling(cS, c.worldTransform);
  //     mat4.getTranslation(cT, c.worldTransform);
  //     mat4.getRotation(cR, c.worldTransform);
  //     mat4.getScaling(dS, d.worldTransform);
  //     mat4.getTranslation(dT, d.worldTransform);
  //     mat4.getRotation(dR, d.worldTransform);
  //     vec3.catmullRom(this.localPosition, aT, bT, cT, dT, t);
  //     vec3.catmullRom(R, aR, bR, cR, dR, t);
  //     quat.normalize(this.localRotation, R);
  //     vec3.catmullRom(this.localScale, aS, bS, cS, dS, t);
  //   };
  // })();
  function TransformComponent(data) {
    var _this;

    _classCallCheck(this, TransformComponent);

    _this = _super.call(this, data);
    _this.dirtyFlag = void 0;
    _this.localDirtyFlag = void 0;
    _this.parent = null;
    _this.localPosition = vec3.fromValues(0, 0, 0);
    _this.localRotation = quat.fromValues(0, 0, 0, 1);
    _this.localScale = vec3.fromValues(1, 1, 1);
    _this.localTransform = mat4.create();
    _this.position = vec3.fromValues(0, 0, 0);
    _this.rotation = quat.fromValues(0, 0, 0, 1);
    _this.scaling = vec3.fromValues(1, 1, 1);
    _this.worldTransform = mat4.create();

    _this.matrixTransform = function () {
      var transformed = mat4.create();
      return function (mat) {
        mat4.multiply(transformed, _this.getLocalTransform(), mat);
        mat4.getScaling(_this.localScale, transformed);
        mat4.getTranslation(_this.localPosition, transformed);
        mat4.getRotation(_this.localRotation, transformed);
      };
    }();

    _this.rotateRollPitchYaw = function () {
      var quatX = quat.create();
      var quatY = quat.create();
      var quatZ = quat.create();
      return function (x, y, z) {
        _this.setDirty();

        quat.fromEuler(quatX, x, 0, 0);
        quat.fromEuler(quatY, 0, y, 0);
        quat.fromEuler(quatZ, 0, 0, z);
        quat.multiply(_this.localRotation, quatX, _this.localRotation);
        quat.multiply(_this.localRotation, _this.localRotation, quatY);
        quat.multiply(_this.localRotation, quatZ, _this.localRotation);
        quat.normalize(_this.localRotation, _this.localRotation);
      };
    }();

    _this.lerp = function () {
      var aS = vec3.create();
      var aR = quat.create();
      var aT = vec3.create();
      var bS = vec3.create();
      var bR = quat.create();
      var bT = vec3.create();
      return function (a, b, t) {
        _this.setDirty();

        mat4.getScaling(aS, a.worldTransform);
        mat4.getTranslation(aT, a.worldTransform);
        mat4.getRotation(aR, a.worldTransform);
        mat4.getScaling(bS, b.worldTransform);
        mat4.getTranslation(bT, b.worldTransform);
        mat4.getRotation(bR, b.worldTransform);
        vec3.lerp(_this.localScale, aS, bS, t);
        quat.slerp(_this.localRotation, aR, bR, t);
        vec3.lerp(_this.localPosition, aT, bT, t);
      };
    }();

    _this.translate = function () {
      var tr = vec3.create();
      return function (translation) {
        vec3.add(tr, _this.getPosition(), translation);

        _this.setPosition(tr);

        _this.setDirty(true);

        return _assertThisInitialized(_this);
      };
    }();

    _this.translateLocal = function () {
      return function (translation) {
        vec3.transformQuat(translation, translation, _this.localRotation);
        vec3.add(_this.localPosition, _this.localPosition, translation);

        _this.setLocalDirty(true);

        return _assertThisInitialized(_this);
      };
    }();

    _this.setPosition = function () {
      var parentInvertMatrix = mat4.create();
      return function (position) {
        _this.position = position;

        _this.setLocalDirty(true);

        if (_this.parent === null) {
          vec3.copy(_this.localPosition, position);
        } else {
          mat4.copy(parentInvertMatrix, _this.parent.worldTransform);
          mat4.invert(parentInvertMatrix, parentInvertMatrix);
          vec3.transformMat4(_this.localPosition, position, parentInvertMatrix);
        }

        return _assertThisInitialized(_this);
      };
    }();

    _this.rotate = function () {
      var parentInvertRotation = quat.create();
      return function (quaternion) {
        if (_this.parent === null) {
          quat.multiply(_this.localRotation, _this.localRotation, quaternion);
          quat.normalize(_this.localRotation, _this.localRotation);
        } else {
          var rot = _this.getRotation();

          var parentRot = _this.parent.getRotation();

          quat.copy(parentInvertRotation, parentRot);
          quat.invert(parentInvertRotation, parentInvertRotation);
          quat.multiply(parentInvertRotation, parentInvertRotation, quaternion);
          quat.multiply(_this.localRotation, quaternion, rot);
          quat.normalize(_this.localRotation, _this.localRotation);
        }

        _this.setLocalDirty();

        return _assertThisInitialized(_this);
      };
    }();

    _this.rotateLocal = function () {
      return function (quaternion) {
        quat.multiply(_this.localRotation, _this.localRotation, quaternion);
        quat.normalize(_this.localRotation, _this.localRotation);

        _this.setLocalDirty(true);

        return _assertThisInitialized(_this);
      };
    }();

    _this.setRotation = function () {
      var invParentRot = quat.create();
      return function (rotation) {
        if (_this.parent === null) {
          quat.copy(_this.localRotation, rotation);
        } else {
          quat.copy(invParentRot, _this.parent.getRotation());
          quat.invert(invParentRot, invParentRot);
          quat.copy(_this.localRotation, invParentRot);
          quat.mul(_this.localRotation, _this.localRotation, rotation);
        }

        _this.setLocalDirty(true);

        return _assertThisInitialized(_this);
      };
    }();

    return _this;
  }

  _createClass(TransformComponent, [{
    key: "setLocalPosition",
    value: function setLocalPosition(position) {
      vec3.copy(this.localPosition, position);
      this.setLocalDirty(true);
    }
  }, {
    key: "setLocalScale",
    value: function setLocalScale(scale) {
      vec3.copy(this.localScale, scale);
      this.setLocalDirty(true);
    }
  }, {
    key: "setLocalRotation",
    value: function setLocalRotation(rotation) {
      quat.copy(this.localRotation, rotation);
      this.setLocalDirty(true);
      return this;
    }
  }, {
    key: "isDirty",
    value: function isDirty() {
      return this.dirtyFlag;
    }
  }, {
    key: "setDirty",
    value: function setDirty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (value) {
        this.dirtyFlag |= TransformComponent.DIRTY;
      } else {
        this.dirtyFlag &= ~TransformComponent.DIRTY;
      }
    }
  }, {
    key: "isLocalDirty",
    value: function isLocalDirty() {
      return this.localDirtyFlag;
    }
  }, {
    key: "setLocalDirty",
    value: function setLocalDirty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (value) {
        this.localDirtyFlag |= TransformComponent.DIRTY;
        this.setDirty(true);
      } else {
        this.localDirtyFlag &= ~TransformComponent.DIRTY;
      }
    }
  }, {
    key: "updateTransform",
    value: function updateTransform() {
      if (this.isLocalDirty()) {
        this.getLocalTransform();
      }

      if (this.isDirty()) {
        if (this.parent === null) {
          mat4.copy(this.worldTransform, this.getLocalTransform());
          this.setDirty(false);
        }
      }
    }
  }, {
    key: "updateTransformWithParent",
    value: function updateTransformWithParent(parent) {
      mat4.multiply(this.worldTransform, parent.worldTransform, this.getLocalTransform());
    }
  }, {
    key: "applyTransform",
    value: function applyTransform() {
      this.setDirty();
      mat4.getScaling(this.localScale, this.worldTransform);
      mat4.getTranslation(this.localPosition, this.worldTransform);
      mat4.getRotation(this.localRotation, this.worldTransform);
    }
  }, {
    key: "clearTransform",
    value: function clearTransform() {
      this.setDirty();
      this.localPosition = vec3.fromValues(0, 0, 0);
      this.localRotation = quat.fromValues(0, 0, 0, 1);
      this.localScale = vec3.fromValues(1, 1, 1);
    }
  }, {
    key: "scaleLocal",
    value: function scaleLocal(scaling) {
      this.setLocalDirty();
      vec3.multiply(this.localScale, this.localScale, scaling);
      return this;
    }
  }, {
    key: "getLocalPosition",
    value: function getLocalPosition() {
      return this.localPosition;
    }
  }, {
    key: "getLocalRotation",
    value: function getLocalRotation() {
      return this.localRotation;
    }
  }, {
    key: "getLocalScale",
    value: function getLocalScale() {
      return this.localScale;
    }
  }, {
    key: "getLocalTransform",
    value: function getLocalTransform() {
      if (this.localDirtyFlag) {
        mat4.fromRotationTranslationScale(this.localTransform, this.localRotation, this.localPosition, this.localScale);
        this.setLocalDirty(false);
      }

      return this.localTransform;
    }
  }, {
    key: "getWorldTransform",
    value: function getWorldTransform() {
      if (!this.isLocalDirty() && !this.isDirty()) {
        return this.worldTransform;
      }

      if (this.parent) {
        this.parent.getWorldTransform();
      }

      this.updateTransform();
      return this.worldTransform;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      mat4.getTranslation(this.position, this.worldTransform);
      return this.position;
    }
  }, {
    key: "getRotation",
    value: function getRotation() {
      mat4.getRotation(this.rotation, this.worldTransform);
      return this.rotation;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      mat4.getScaling(this.scaling, this.worldTransform);
      return this.scaling;
    }
  }]);

  return TransformComponent;
}(Component);
TransformComponent.DIRTY = 1 << 0;
//# sourceMappingURL=TransformComponent.js.map