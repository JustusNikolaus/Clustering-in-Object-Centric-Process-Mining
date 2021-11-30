"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _inversify = require("inversify");

var _polylineNormals = _interopRequireDefault(require("../../utils/polyline-normals"));

var _Renderable2 = require("../Renderable");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* babel-plugin-inline-import './shaders/webgl.line.frag.glsl' */
var lineFrag = "uniform float u_dash_array : 0.02;\nuniform float u_dash_offset : 0;\nuniform float u_dash_ratio : 0;\nuniform float u_thickness : 0.02;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_counters;\n\nvoid main() {\n    float blur = 1. - smoothstep(0.98, 1., length(v_normal));\n\n    gl_FragColor = v_color;\n    gl_FragColor.a *= blur * ceil(mod(v_counters + u_dash_offset, u_dash_array) - (u_dash_array * u_dash_ratio));\n}";

/* babel-plugin-inline-import './shaders/webgl.line.vert.glsl' */
var lineVert = "attribute vec2 a_pos;\nattribute vec4 a_color;\nattribute float a_line_miter;\nattribute vec2 a_line_normal;\nattribute float a_counters;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform float u_thickness : 0.02;\nuniform vec2 u_viewport;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_counters;\n\nvoid main() {\n  v_color = a_color;\n  v_counters = a_counters;\n\n  vec3 normal = normalize(vec3(a_line_normal, 0.0));\n\n  vec4 offset = vec4(normal * u_thickness / 2.0 * a_line_miter, 0.0);\n\n  v_normal = vec2(normal * sign(a_line_miter));\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(a_pos, 0.0, 1.0) + offset;\n}\n";
var Line = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.Systems), _dec3 = (0, _inversify.named)(_gWebgpuCore.IDENTIFIER.MaterialSystem), _dec4 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.Systems), _dec5 = (0, _inversify.named)(_gWebgpuCore.IDENTIFIER.GeometrySystem), _dec6 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Renderable) {
  (0, _inherits2.default)(Line, _Renderable);

  var _super = _createSuper(Line);

  function Line() {
    var _this;

    (0, _classCallCheck2.default)(this, Line);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _initializerDefineProperty2.default)(_this, "materialSystem", _descriptor, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)(_this, "geometrySystem", _descriptor2, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)(_this, "shaderModuleService", _descriptor3, (0, _assertThisInitialized2.default)(_this));
    _this.vertexCount = void 0;
    return _this;
  }

  (0, _createClass2.default)(Line, [{
    key: "onAttributeChanged",
    value: function onAttributeChanged(_ref) {
      var name = _ref.name,
          data = _ref.data;
      var mesh = this.getMeshComponent();

      if (mesh && mesh.material) {
        switch (name) {
          case 'dashArray':
            mesh.material.setUniform('u_dash_array', data);
            break;

          case 'dashOffset':
            mesh.material.setUniform('u_dash_offset', data);
            break;

          case 'dashRatio':
            mesh.material.setUniform('u_dash_ratio', data);
            break;

          case 'thickness':
            mesh.material.setUniform('u_thickness', data);
            break;

          case 'color':
            var colors = new Array(this.vertexCount).fill(undefined).map(function () {
              return data;
            }).reduce(function (prev, cur) {
              // @ts-ignore
              return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(cur));
            }, []); // @ts-ignore

            mesh.geometry.setAttribute('a_color', Float32Array.from(colors), {
              arrayStride: 4 * 4,
              stepMode: 'vertex',
              attributes: [{
                shaderLocation: 1,
                offset: 0,
                format: 'float4'
              }]
            });
            break;
        }
      }
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this2 = this;

      this.shaderModuleService.registerModule('line', {
        vs: lineVert,
        fs: lineFrag
      });

      var _this$shaderModuleSer = this.shaderModuleService.getModule('line'),
          vs = _this$shaderModuleSer.vs,
          fs = _this$shaderModuleSer.fs,
          extractedUniforms = _this$shaderModuleSer.uniforms;

      var material = this.materialSystem.createShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs
      });

      var _getNormals = (0, _polylineNormals.default)(this.config.points, false),
          normals = _getNormals.normals,
          attrIndex = _getNormals.attrIndex,
          attrPos = _getNormals.attrPos,
          attrCounters = _getNormals.attrCounters;

      var vertexCount = attrPos.length;
      this.vertexCount = vertexCount;
      var geometry = this.geometrySystem.createBufferGeometry({
        vertexCount: vertexCount
      });
      this.setMaterial(material);
      this.setGeometry(geometry);
      material.setCull({
        enable: false,
        face: _gWebgpuCore.gl.BACK
      }) // @ts-ignore
      .setUniform(extractedUniforms);
      this.setAttributes({
        dashArray: this.config.dashArray,
        dashOffset: this.config.dashOffset,
        dashRatio: this.config.dashRatio,
        thickness: this.config.thickness
      });
      var attrNormal = [];
      var attrMiter = [];
      normals.forEach(function (n) {
        var norm = n[0];
        var miter = n[1];
        attrNormal.push([norm[0], norm[1]]); // @ts-ignore

        attrMiter.push(miter);
      }); // [[0,1,2], [2,1,3]]

      geometry.setIndex(attrIndex.reduce(function (prev, cur) {
        return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(cur));
      }, []));
      geometry.setAttribute('a_pos', Float32Array.from(attrPos.reduce(function (prev, cur) {
        return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(cur));
      }, [])), {
        arrayStride: 4 * 2,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 0,
          offset: 0,
          format: 'float2'
        }]
      });
      var colors = new Array(vertexCount).fill(undefined).map(function () {
        return (0, _toConsumableArray2.default)(_this2.config.color);
      }).reduce(function (prev, cur) {
        return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(cur));
      }, []);
      geometry.setAttribute('a_color', Float32Array.from(colors), {
        arrayStride: 4 * 4,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 1,
          offset: 0,
          format: 'float4'
        }]
      });
      geometry.setAttribute('a_line_miter', Float32Array.from(attrMiter), {
        arrayStride: 4 * 1,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 2,
          offset: 0,
          format: 'float'
        }]
      });
      geometry.setAttribute('a_line_normal', Float32Array.from(attrNormal.reduce(function (prev, cur) {
        return [].concat((0, _toConsumableArray2.default)(prev), (0, _toConsumableArray2.default)(cur));
      }, [])), {
        arrayStride: 4 * 2,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 3,
          offset: 0,
          format: 'float2'
        }]
      });
      geometry.setAttribute('a_counters', Float32Array.from(attrCounters), {
        arrayStride: 4 * 1,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 4,
          offset: 0,
          format: 'float'
        }]
      });
    }
  }]);
  return Line;
}(_Renderable2.Renderable), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "materialSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "geometrySystem", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "shaderModuleService", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Line = Line;
//# sourceMappingURL=index.js.map