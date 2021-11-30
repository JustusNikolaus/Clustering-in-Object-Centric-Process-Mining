"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialComponent = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ = require("../..");

var _ComponentManager = require("../../ComponentManager");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MaterialComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MaterialComponent, _Component);

  var _super = _createSuper(MaterialComponent);

  // control flow in shaders, eg. USE_UV, USE_MAP...
  function MaterialComponent(data) {
    var _this;

    (0, _classCallCheck2.default)(this, MaterialComponent);
    _this = _super.call(this, data);
    _this.vertexShaderGLSL = void 0;
    _this.fragmentShaderGLSL = void 0;
    _this.defines = {};
    _this.dirty = true;
    _this.uniforms = [];
    _this.cull = {
      enable: true,
      face: _.gl.BACK
    };
    _this.depth = {
      enable: true
    };
    _this.blend = void 0;
    _this.entity = void 0;
    _this.type = void 0;
    Object.assign((0, _assertThisInitialized2.default)(_this), data);
    return _this;
  }

  (0, _createClass2.default)(MaterialComponent, [{
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
}(_ComponentManager.Component);

exports.MaterialComponent = MaterialComponent;
//# sourceMappingURL=MaterialComponent.js.map