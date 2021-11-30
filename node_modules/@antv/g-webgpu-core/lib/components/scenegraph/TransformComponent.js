"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _glMatrix = require("gl-matrix");

var _ComponentManager = require("../../ComponentManager");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TransformComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TransformComponent, _Component);

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

    (0, _classCallCheck2.default)(this, TransformComponent);
    _this = _super.call(this, data);
    _this.dirtyFlag = void 0;
    _this.localDirtyFlag = void 0;
    _this.parent = null;
    _this.localPosition = _glMatrix.vec3.fromValues(0, 0, 0);
    _this.localRotation = _glMatrix.quat.fromValues(0, 0, 0, 1);
    _this.localScale = _glMatrix.vec3.fromValues(1, 1, 1);
    _this.localTransform = _glMatrix.mat4.create();
    _this.position = _glMatrix.vec3.fromValues(0, 0, 0);
    _this.rotation = _glMatrix.quat.fromValues(0, 0, 0, 1);
    _this.scaling = _glMatrix.vec3.fromValues(1, 1, 1);
    _this.worldTransform = _glMatrix.mat4.create();

    _this.matrixTransform = function () {
      var transformed = _glMatrix.mat4.create();

      return function (mat) {
        _glMatrix.mat4.multiply(transformed, _this.getLocalTransform(), mat);

        _glMatrix.mat4.getScaling(_this.localScale, transformed);

        _glMatrix.mat4.getTranslation(_this.localPosition, transformed);

        _glMatrix.mat4.getRotation(_this.localRotation, transformed);
      };
    }();

    _this.rotateRollPitchYaw = function () {
      var quatX = _glMatrix.quat.create();

      var quatY = _glMatrix.quat.create();

      var quatZ = _glMatrix.quat.create();

      return function (x, y, z) {
        _this.setDirty();

        _glMatrix.quat.fromEuler(quatX, x, 0, 0);

        _glMatrix.quat.fromEuler(quatY, 0, y, 0);

        _glMatrix.quat.fromEuler(quatZ, 0, 0, z);

        _glMatrix.quat.multiply(_this.localRotation, quatX, _this.localRotation);

        _glMatrix.quat.multiply(_this.localRotation, _this.localRotation, quatY);

        _glMatrix.quat.multiply(_this.localRotation, quatZ, _this.localRotation);

        _glMatrix.quat.normalize(_this.localRotation, _this.localRotation);
      };
    }();

    _this.lerp = function () {
      var aS = _glMatrix.vec3.create();

      var aR = _glMatrix.quat.create();

      var aT = _glMatrix.vec3.create();

      var bS = _glMatrix.vec3.create();

      var bR = _glMatrix.quat.create();

      var bT = _glMatrix.vec3.create();

      return function (a, b, t) {
        _this.setDirty();

        _glMatrix.mat4.getScaling(aS, a.worldTransform);

        _glMatrix.mat4.getTranslation(aT, a.worldTransform);

        _glMatrix.mat4.getRotation(aR, a.worldTransform);

        _glMatrix.mat4.getScaling(bS, b.worldTransform);

        _glMatrix.mat4.getTranslation(bT, b.worldTransform);

        _glMatrix.mat4.getRotation(bR, b.worldTransform);

        _glMatrix.vec3.lerp(_this.localScale, aS, bS, t);

        _glMatrix.quat.slerp(_this.localRotation, aR, bR, t);

        _glMatrix.vec3.lerp(_this.localPosition, aT, bT, t);
      };
    }();

    _this.translate = function () {
      var tr = _glMatrix.vec3.create();

      return function (translation) {
        _glMatrix.vec3.add(tr, _this.getPosition(), translation);

        _this.setPosition(tr);

        _this.setDirty(true);

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    _this.translateLocal = function () {
      return function (translation) {
        _glMatrix.vec3.transformQuat(translation, translation, _this.localRotation);

        _glMatrix.vec3.add(_this.localPosition, _this.localPosition, translation);

        _this.setLocalDirty(true);

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    _this.setPosition = function () {
      var parentInvertMatrix = _glMatrix.mat4.create();

      return function (position) {
        _this.position = position;

        _this.setLocalDirty(true);

        if (_this.parent === null) {
          _glMatrix.vec3.copy(_this.localPosition, position);
        } else {
          _glMatrix.mat4.copy(parentInvertMatrix, _this.parent.worldTransform);

          _glMatrix.mat4.invert(parentInvertMatrix, parentInvertMatrix);

          _glMatrix.vec3.transformMat4(_this.localPosition, position, parentInvertMatrix);
        }

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    _this.rotate = function () {
      var parentInvertRotation = _glMatrix.quat.create();

      return function (quaternion) {
        if (_this.parent === null) {
          _glMatrix.quat.multiply(_this.localRotation, _this.localRotation, quaternion);

          _glMatrix.quat.normalize(_this.localRotation, _this.localRotation);
        } else {
          var rot = _this.getRotation();

          var parentRot = _this.parent.getRotation();

          _glMatrix.quat.copy(parentInvertRotation, parentRot);

          _glMatrix.quat.invert(parentInvertRotation, parentInvertRotation);

          _glMatrix.quat.multiply(parentInvertRotation, parentInvertRotation, quaternion);

          _glMatrix.quat.multiply(_this.localRotation, quaternion, rot);

          _glMatrix.quat.normalize(_this.localRotation, _this.localRotation);
        }

        _this.setLocalDirty();

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    _this.rotateLocal = function () {
      return function (quaternion) {
        _glMatrix.quat.multiply(_this.localRotation, _this.localRotation, quaternion);

        _glMatrix.quat.normalize(_this.localRotation, _this.localRotation);

        _this.setLocalDirty(true);

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    _this.setRotation = function () {
      var invParentRot = _glMatrix.quat.create();

      return function (rotation) {
        if (_this.parent === null) {
          _glMatrix.quat.copy(_this.localRotation, rotation);
        } else {
          _glMatrix.quat.copy(invParentRot, _this.parent.getRotation());

          _glMatrix.quat.invert(invParentRot, invParentRot);

          _glMatrix.quat.copy(_this.localRotation, invParentRot);

          _glMatrix.quat.mul(_this.localRotation, _this.localRotation, rotation);
        }

        _this.setLocalDirty(true);

        return (0, _assertThisInitialized2.default)(_this);
      };
    }();

    return _this;
  }

  (0, _createClass2.default)(TransformComponent, [{
    key: "setLocalPosition",
    value: function setLocalPosition(position) {
      _glMatrix.vec3.copy(this.localPosition, position);

      this.setLocalDirty(true);
    }
  }, {
    key: "setLocalScale",
    value: function setLocalScale(scale) {
      _glMatrix.vec3.copy(this.localScale, scale);

      this.setLocalDirty(true);
    }
  }, {
    key: "setLocalRotation",
    value: function setLocalRotation(rotation) {
      _glMatrix.quat.copy(this.localRotation, rotation);

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
          _glMatrix.mat4.copy(this.worldTransform, this.getLocalTransform());

          this.setDirty(false);
        }
      }
    }
  }, {
    key: "updateTransformWithParent",
    value: function updateTransformWithParent(parent) {
      _glMatrix.mat4.multiply(this.worldTransform, parent.worldTransform, this.getLocalTransform());
    }
  }, {
    key: "applyTransform",
    value: function applyTransform() {
      this.setDirty();

      _glMatrix.mat4.getScaling(this.localScale, this.worldTransform);

      _glMatrix.mat4.getTranslation(this.localPosition, this.worldTransform);

      _glMatrix.mat4.getRotation(this.localRotation, this.worldTransform);
    }
  }, {
    key: "clearTransform",
    value: function clearTransform() {
      this.setDirty();
      this.localPosition = _glMatrix.vec3.fromValues(0, 0, 0);
      this.localRotation = _glMatrix.quat.fromValues(0, 0, 0, 1);
      this.localScale = _glMatrix.vec3.fromValues(1, 1, 1);
    }
  }, {
    key: "scaleLocal",
    value: function scaleLocal(scaling) {
      this.setLocalDirty();

      _glMatrix.vec3.multiply(this.localScale, this.localScale, scaling);

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
        _glMatrix.mat4.fromRotationTranslationScale(this.localTransform, this.localRotation, this.localPosition, this.localScale);

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
      _glMatrix.mat4.getTranslation(this.position, this.worldTransform);

      return this.position;
    }
  }, {
    key: "getRotation",
    value: function getRotation() {
      _glMatrix.mat4.getRotation(this.rotation, this.worldTransform);

      return this.rotation;
    }
  }, {
    key: "getScale",
    value: function getScale() {
      _glMatrix.mat4.getScaling(this.scaling, this.worldTransform);

      return this.scaling;
    }
  }]);
  return TransformComponent;
}(_ComponentManager.Component);

exports.TransformComponent = TransformComponent;
TransformComponent.DIRTY = 1 << 0;
//# sourceMappingURL=TransformComponent.js.map