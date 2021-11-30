import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { gl } from '../..';
import { Component } from '../../ComponentManager';
export var MaterialComponent = /*#__PURE__*/function (_Component) {
  _inherits(MaterialComponent, _Component);

  var _super = _createSuper(MaterialComponent);

  // control flow in shaders, eg. USE_UV, USE_MAP...
  function MaterialComponent(data) {
    var _this;

    _classCallCheck(this, MaterialComponent);

    _this = _super.call(this, data);
    _this.vertexShaderGLSL = void 0;
    _this.fragmentShaderGLSL = void 0;
    _this.defines = {};
    _this.dirty = true;
    _this.uniforms = [];
    _this.cull = {
      enable: true,
      face: gl.BACK
    };
    _this.depth = {
      enable: true
    };
    _this.blend = void 0;
    _this.entity = void 0;
    _this.type = void 0;
    Object.assign(_assertThisInitialized(_this), data);
    return _this;
  }

  _createClass(MaterialComponent, [{
    key: "setDefines",
    value: function setDefines(defines) {
      this.defines = _objectSpread(_objectSpread({}, this.defines), defines);
      return this;
    }
  }, {
    key: "setCull",
    value: function setCull(cull) {
      this.cull = cull;
      return this;
    }
  }, {
    key: "setDepth",
    value: function setDepth(depth) {
      this.depth = depth;
      return this;
    }
  }, {
    key: "setBlend",
    value: function setBlend(blend) {
      this.blend = blend;
      return this;
    }
  }, {
    key: "setUniform",
    value: function setUniform(name, data) {
      var _this2 = this;

      if (typeof name !== 'string') {
        Object.keys(name).forEach(function (key) {
          return _this2.setUniform(key, name[key]);
        });
        return this;
      }

      var existedUniform = this.uniforms.find(function (u) {
        return u.name === name;
      });

      if (!existedUniform) {
        this.uniforms.push({
          name: name,
          dirty: true,
          data: data
        });
      } else {
        existedUniform.dirty = true;
        existedUniform.data = data;
      }

      this.dirty = true;
      return this;
    }
  }]);

  return MaterialComponent;
}(Component);
//# sourceMappingURL=MaterialComponent.js.map