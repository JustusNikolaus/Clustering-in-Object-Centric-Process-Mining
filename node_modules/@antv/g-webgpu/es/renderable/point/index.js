import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { gl, IDENTIFIER } from '@antv/g-webgpu-core';
import { inject, injectable, named } from 'inversify';
import { encodePickingColor } from '../../utils/picking';
import { Renderable } from '../Renderable';

/* babel-plugin-inline-import './shaders/webgl.point.frag.glsl' */
var pointFrag = "uniform float u_blur : 0.05;\nuniform float u_opacity : 0.7;\nuniform float u_stroke_width : 0.01;\nuniform vec4 u_stroke_color : [0, 0, 0, 0];\nuniform float u_stroke_opacity : 1;\n\nvarying vec4 v_color;\nvarying vec4 v_data;\nvarying float v_radius;\n\n#pragma include \"sdf2d\"\n#pragma include \"picking\"\n\nvoid main() {\n  int shape = int(floor(v_data.w + 0.5));\n\n  float antialiasblur = v_data.z;\n  float antialiased_blur = -max(u_blur, antialiasblur);\n  float r = v_radius / (v_radius + u_stroke_width);\n\n  float outer_df;\n  float inner_df;\n  // 'circle', 'triangle', 'square', 'pentagon', 'hexagon', 'octogon', 'hexagram', 'rhombus', 'vesica'\n  // if (shape == 0) {\n    outer_df = sdCircle(v_data.xy, 1.0);\n    inner_df = sdCircle(v_data.xy, r);\n  // } else if (shape == 1) {\n  //   outer_df = sdEquilateralTriangle(1.1 * v_data.xy);\n  //   inner_df = sdEquilateralTriangle(1.1 / r * v_data.xy);\n  // } else if (shape == 2) {\n  //   outer_df = sdBox(v_data.xy, vec2(1.));\n  //   inner_df = sdBox(v_data.xy, vec2(r));\n  // } else if (shape == 3) {\n  //   outer_df = sdPentagon(v_data.xy, 0.8);\n  //   inner_df = sdPentagon(v_data.xy, r * 0.8);\n  // } else if (shape == 4) {\n  //   outer_df = sdHexagon(v_data.xy, 0.8);\n  //   inner_df = sdHexagon(v_data.xy, r * 0.8);\n  // } else if (shape == 5) {\n  //   outer_df = sdOctogon(v_data.xy, 1.0);\n  //   inner_df = sdOctogon(v_data.xy, r);\n  // } else if (shape == 6) {\n  //   outer_df = sdHexagram(v_data.xy, 0.52);\n  //   inner_df = sdHexagram(v_data.xy, r * 0.52);\n  // } else if (shape == 7) {\n  //   outer_df = sdRhombus(v_data.xy, vec2(1.0));\n  //   inner_df = sdRhombus(v_data.xy, vec2(r));\n  // } else if (shape == 8) {\n  //   outer_df = sdVesica(v_data.xy, 1.1, 0.8);\n  //   inner_df = sdVesica(v_data.xy, r * 1.1, r * 0.8);\n  // }\n\n  float opacity_t = smoothstep(0.0, antialiased_blur, outer_df);\n\n  float color_t = u_stroke_width < 0.01 ? 0.0 : smoothstep(\n    antialiased_blur,\n    0.0,\n    inner_df\n  );\n  vec4 strokeColor = u_stroke_color == vec4(0) ? v_color : u_stroke_color;\n\n  gl_FragColor = mix(vec4(v_color.rgb, v_color.a * u_opacity), strokeColor * u_stroke_opacity, color_t);\n  gl_FragColor.a = gl_FragColor.a * opacity_t;\n\n  gl_FragColor = filterColor(gl_FragColor);\n}";

/* babel-plugin-inline-import './shaders/webgl.point.vert.glsl' */
var pointVert = "attribute vec2 position;\nattribute vec4 color;\nattribute float shape;\nattribute vec2 offset;\nattribute float size;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nuniform float u_stroke_width : 0.01;\nuniform float u_device_pixel_ratio;\nuniform vec2 u_viewport;\n\nvarying vec4 v_color;\nvarying vec4 v_data;\nvarying float v_radius;\n\n#pragma include \"picking\"\n\nvoid main() {\n  v_color = color;\n  v_radius = size;\n\n  lowp float antialiasblur = 1.0 / u_device_pixel_ratio * (size + u_stroke_width);\n\n  // construct point coords\n  v_data = vec4(position, antialiasblur, shape);\n\n  gl_Position = projectionMatrix * modelViewMatrix\n    * vec4(position * size + offset, 0.0, 1.0);\n\n  setPickingColor(a_PickingColor);\n}";
var pointShapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'octogon', 'hexagram', 'rhombus', 'vesica'];
export
/**
 * Use SDF to draw 2D point with stroke.
 */
var Point = (_dec = injectable(), _dec2 = inject(IDENTIFIER.Systems), _dec3 = named(IDENTIFIER.MaterialSystem), _dec4 = inject(IDENTIFIER.Systems), _dec5 = named(IDENTIFIER.GeometrySystem), _dec6 = inject(IDENTIFIER.ShaderModuleService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Renderable) {
  _inherits(Point, _Renderable);

  var _super = _createSuper(Point);

  function Point() {
    var _this;

    _classCallCheck(this, Point);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "materialSystem", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "geometrySystem", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "shaderModuleService", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Point, [{
    key: "onAttributeChanged",
    value: function onAttributeChanged(_ref) {
      var name = _ref.name,
          data = _ref.data;
      var mesh = this.getMeshComponent();

      if (mesh && mesh.material) {
        if (name === 'strokeWidth') {
          mesh.material.setUniform('u_stroke_width', data);
        } else if (name === 'strokeColor') {
          mesh.material.setUniform('u_stroke_color', data);
        } else if (name === 'strokeOpacity') {
          mesh.material.setUniform('u_stroke_opacity', data);
        } else if (name === 'opacity') {
          mesh.material.setUniform('u_opacity', data);
        } else if (name === 'blur') {
          mesh.material.setUniform('u_blur', data);
        }
      }
    }
  }, {
    key: "onEntityCreated",
    value: function onEntityCreated() {
      this.shaderModuleService.registerModule('grid', {
        vs: pointVert,
        fs: pointFrag
      });

      var _this$shaderModuleSer = this.shaderModuleService.getModule('grid'),
          vs = _this$shaderModuleSer.vs,
          fs = _this$shaderModuleSer.fs,
          extractedUniforms = _this$shaderModuleSer.uniforms;

      var material = this.materialSystem.createShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        cull: {
          enable: false
        },
        depth: {
          enable: false
        },
        blend: {
          enable: true,
          func: {
            srcRGB: gl.SRC_ALPHA,
            dstRGB: gl.ONE_MINUS_SRC_ALPHA,
            srcAlpha: 1,
            dstAlpha: 1
          }
        }
      }); // TODO: support define stroke-relative props per point

      material.setUniform(_objectSpread({
        u_device_pixel_ratio: window.devicePixelRatio
      }, extractedUniforms));
      var attributes = this.buildAttributes();
      var geometry = this.geometrySystem.createInstancedBufferGeometry({
        maxInstancedCount: attributes.instancedOffsets.length / 2,
        vertexCount: 6
      });
      geometry.setIndex([0, 2, 1, 0, 3, 2]);
      geometry.setAttribute('position', Float32Array.from(attributes.positions), {
        arrayStride: 4 * 2,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 0,
          offset: 0,
          format: 'float2'
        }]
      });
      geometry.setAttribute('offset', Float32Array.from(attributes.instancedOffsets), {
        arrayStride: 4 * 2,
        stepMode: 'instance',
        attributes: [{
          shaderLocation: 1,
          offset: 0,
          format: 'float2'
        }]
      });
      geometry.setAttribute('color', Float32Array.from(attributes.instancedColors), {
        arrayStride: 4 * 4,
        stepMode: 'instance',
        attributes: [{
          shaderLocation: 2,
          offset: 0,
          format: 'float4'
        }]
      });
      geometry.setAttribute('size', Float32Array.from(attributes.instancedSizes), {
        arrayStride: 4,
        stepMode: 'instance',
        attributes: [{
          shaderLocation: 3,
          offset: 0,
          format: 'float'
        }]
      });
      geometry.setAttribute('shape', Float32Array.from(attributes.instancedShapes), {
        arrayStride: 4,
        stepMode: 'instance',
        attributes: [{
          shaderLocation: 4,
          offset: 0,
          format: 'float'
        }]
      });
      geometry.setAttribute('a_PickingColor', Float32Array.from(attributes.instancedPickingColors), {
        arrayStride: 4 * 3,
        stepMode: 'instance',
        attributes: [{
          shaderLocation: 6,
          offset: 0,
          format: 'float3'
        }]
      });
      this.setMaterial(material);
      this.setGeometry(geometry);
    }
  }, {
    key: "buildAttribute",
    value: function buildAttribute(config, attributes, index) {
      var _attributes$instanced, _attributes$instanced2, _attributes$instanced3, _attributes$instanced4;

      (_attributes$instanced = attributes.instancedPickingColors).push.apply(_attributes$instanced, _toConsumableArray(encodePickingColor(config.id || index)));

      attributes.instancedShapes.push(pointShapes.indexOf(config.shape || 'circle'));

      (_attributes$instanced2 = attributes.instancedColors).push.apply(_attributes$instanced2, _toConsumableArray(config.color || [1, 0, 0, 1]));

      (_attributes$instanced3 = attributes.instancedOffsets).push.apply(_attributes$instanced3, _toConsumableArray(config.position || [0, 0]));

      (_attributes$instanced4 = attributes.instancedSizes).push.apply(_attributes$instanced4, _toConsumableArray(config.size || [0.2, 0.2]));
    }
  }, {
    key: "buildAttributes",
    value: function buildAttributes() {
      var _this2 = this;

      var attributes = {
        positions: [1, 1, 1, -1, -1, -1, -1, 1],
        instancedOffsets: [],
        instancedColors: [],
        instancedSizes: [],
        instancedShapes: [],
        instancedPickingColors: []
      };

      if (Array.isArray(this.config)) {
        this.config.forEach(function (config, i) {
          _this2.buildAttribute(config, attributes, i);
        });
      } else {
        this.buildAttribute(this.config, attributes, 0);
      }

      return attributes;
    }
  }]);

  return Point;
}(Renderable), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "materialSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "geometrySystem", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "shaderModuleService", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=index.js.map