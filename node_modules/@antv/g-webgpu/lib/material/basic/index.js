"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Basic = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _glMatrix = require("gl-matrix");

var _inversify = require("inversify");

var _ = require("..");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* babel-plugin-inline-import './shaders/webgl.basic.frag.glsl' */
var webglFragmentShaderGLSL = "varying vec4 fragColor;\n\n#pragma include \"uv.frag.declaration\"\n#pragma include \"map.frag.declaration\"\n\nvoid main() {\n  vec4 diffuseColor = fragColor;\n\n  #pragma include \"map.frag.main\"\n\n  gl_FragColor = diffuseColor;\n}";

/* babel-plugin-inline-import './shaders/webgl.basic.vert.glsl' */
var webglVertexShaderGLSL = "attribute vec3 position;\nattribute vec3 normal;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform vec4 color;\n\nvarying vec4 fragColor;\n\n#pragma include \"uv.vert.declaration\"\n\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  fragColor = color;\n\n  #pragma include \"uv.vert.main\"\n}";

/* babel-plugin-inline-import './shaders/webgpu.basic.frag.glsl' */
var webgpuFragmentShaderGLSL = "// layout(set = 0, binding = 1) uniform WireframeUniforms {\n//   float lineWidth;\n//   vec4 lineColor;\n// } wireframe;\n\nlayout(location = 0) in vec4 fragColor;\n// layout(location = 1) in vec3 v_Barycentric;\n\nlayout(location = 0) out vec4 outColor;\n\n// wireframe\n// float edgeFactor() {\n//   vec3 d = fwidth(v_Barycentric);\n//   vec3 a3 = smoothstep(vec3(0.0), d * wireframe.lineWidth, v_Barycentric);\n//   return min(min(a3.x, a3.y), a3.z);\n// }\n\nvoid main() {\n  // outColor = mix(fragColor, wireframe.lineColor, (1.0 - edgeFactor()));\n  outColor = fragColor;\n}";

/* babel-plugin-inline-import './shaders/webgpu.basic.vert.glsl' */
var webgpuVertexShaderGLSL = "layout(set = 0, binding = 0) uniform Uniforms {\n  vec4 color;\n  mat4 projectionMatrix;\n  mat4 modelViewMatrix;\n} uniforms;\n\nlayout(location = 0) in vec3 position;\n// layout(location = 1) in vec3 barycentric;\n\nlayout(location = 0) out vec4 fragColor;\n// layout(location = 1) out vec3 v_Barycentric;\n\nvoid main() {\n  gl_Position = uniforms.projectionMatrix * uniforms.modelViewMatrix * vec4(position, 1.0);\n  fragColor = uniforms.color;\n  // v_Barycentric = barycentric;\n}";
var
/**
 * This material is not affected by lights.
 * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
 */
Basic = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.RenderEngine), _dec3 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Material) {
  (0, _inherits2.default)(Basic, _Material);

  var _super = _createSuper(Basic);

  function Basic() {
    var _this;

    (0, _classCallCheck2.default)(this, Basic);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _initializerDefineProperty2.default)(_this, "engine", _descriptor, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)(_this, "shaderModuleService", _descriptor2, (0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Basic, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var component = this.getComponent();
      var vertexShaderGLSL = this.engine.supportWebGPU ? webgpuVertexShaderGLSL : webglVertexShaderGLSL;
      var fragmentShaderGLSL = this.engine.supportWebGPU ? webgpuFragmentShaderGLSL : webglFragmentShaderGLSL;
      this.shaderModuleService.registerModule('material-basic', {
        vs: vertexShaderGLSL,
        fs: fragmentShaderGLSL
      });

      var _this$shaderModuleSer = this.shaderModuleService.getModule('material-basic'),
          vs = _this$shaderModuleSer.vs,
          fs = _this$shaderModuleSer.fs,
          extractedUniforms = _this$shaderModuleSer.uniforms;

      component.vertexShaderGLSL = vs;
      component.fragmentShaderGLSL = fs; // @ts-ignore

      component.setUniform(extractedUniforms);

      if (this.config.map) {
        component.setDefines({
          USE_UV: 1,
          USE_MAP: 1
        });
        component.setUniform({
          // @ts-ignore
          map: this.config.map,
          uvTransform: _glMatrix.mat3.create()
        });
      }
    }
  }]);
  return Basic;
}(_.Material), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "shaderModuleService", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Basic = Basic;
//# sourceMappingURL=index.js.map