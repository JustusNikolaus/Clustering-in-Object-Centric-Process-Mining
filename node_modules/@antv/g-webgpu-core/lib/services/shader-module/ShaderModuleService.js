"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inversify = require("inversify");

var _shaderModule = require("../../utils/shader-module");

var _uniq = require("../../utils/uniq");

var _dec, _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* babel-plugin-inline-import './shaders/webgl.picking.frag.glsl' */
var pickingFrag = "varying vec4 v_PickingResult;\nuniform vec4 u_HighlightColor : [0, 0, 0, 0];\nuniform float u_PickingStage : 0.0;\n\n#define PICKING_ENCODE 1.0\n#define PICKING_HIGHLIGHT 2.0\n#define COLOR_SCALE 1. / 255.\n\n/*\n * Returns highlight color if this item is selected.\n */\nvec4 filterHighlightColor(vec4 color) {\n  bool selected = bool(v_PickingResult.a);\n\n  if (selected) {\n    vec4 highLightColor = u_HighlightColor * COLOR_SCALE;\n\n    float highLightAlpha = highLightColor.a;\n    float highLightRatio = highLightAlpha / (highLightAlpha + color.a * (1.0 - highLightAlpha));\n\n    vec3 resultRGB = mix(color.rgb, highLightColor.rgb, highLightRatio);\n    return vec4(resultRGB, color.a);\n  } else {\n    return color;\n  }\n}\n\n/*\n * Returns picking color if picking enabled else unmodified argument.\n */\nvec4 filterPickingColor(vec4 color) {\n  vec3 pickingColor = v_PickingResult.rgb;\n  if (u_PickingStage == PICKING_ENCODE && length(pickingColor) < 0.001) {\n    discard;\n  }\n  return u_PickingStage == PICKING_ENCODE ? vec4(pickingColor, step(0.001,color.a)): color;\n}\n\n/*\n * Returns picking color if picking is enabled if not\n * highlight color if this item is selected, otherwise unmodified argument.\n */\nvec4 filterColor(vec4 color) {\n  return filterPickingColor(filterHighlightColor(color));\n}\n";

/* babel-plugin-inline-import './shaders/webgl.picking.vert.glsl' */
var pickingVert = "attribute vec3 a_PickingColor;\nvarying vec4 v_PickingResult;\n\nuniform vec3 u_PickingColor : [0, 0, 0];\nuniform vec4 u_HighlightColor : [0, 0, 0, 0];\nuniform float u_PickingStage : 0.0;\nuniform float u_PickingThreshold : 1.0;\nuniform float u_PickingBuffer: 0.0;\n\n#define PICKING_ENCODE 1.0\n#define PICKING_HIGHLIGHT 2.0\n#define COLOR_SCALE 1. / 255.\n\nbool isVertexPicked(vec3 vertexColor) {\n  return\n    abs(vertexColor.r - u_PickingColor.r) < u_PickingThreshold &&\n    abs(vertexColor.g - u_PickingColor.g) < u_PickingThreshold &&\n    abs(vertexColor.b - u_PickingColor.b) < u_PickingThreshold;\n}\n\nvoid setPickingColor(vec3 pickingColor) {\n  // compares only in highlight stage\n  v_PickingResult.a = float((u_PickingStage == PICKING_HIGHLIGHT) && isVertexPicked(pickingColor));\n\n  // Stores the picking color so that the fragment shader can render it during picking\n  v_PickingResult.rgb = pickingColor * COLOR_SCALE;\n}\n\nfloat setPickingSize(float x) {\n   return u_PickingStage == PICKING_ENCODE ? x + u_PickingBuffer : x;\n}";

/* babel-plugin-inline-import './shaders/webgl.sdf2d.frag.glsl' */
var sdf2dFrag = "/**\n * 2D signed distance field functions\n * @see http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm\n */\n\nfloat ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }\n\nfloat sdCircle(vec2 p, float r) {\n  return length(p) - r;\n}\n\nfloat sdEquilateralTriangle(vec2 p) {\n  float k = sqrt(3.0);\n  p.x = abs(p.x) - 1.0;\n  p.y = p.y + 1.0/k;\n  if( p.x + k*p.y > 0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;\n  p.x -= clamp( p.x, -2.0, 0.0 );\n  return -length(p)*sign(p.y);\n}\n\nfloat sdBox(vec2 p, vec2 b) {\n  vec2 d = abs(p)-b;\n  return length(max(d,vec2(0))) + min(max(d.x,d.y),0.0);\n}\n\nfloat sdPentagon(vec2 p, float r) {\n  vec3 k = vec3(0.809016994,0.587785252,0.726542528);\n  p.x = abs(p.x);\n  p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);\n  p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);\n  p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);\n  return length(p)*sign(p.y);\n}\n\nfloat sdHexagon(vec2 p, float r) {\n  vec3 k = vec3(-0.866025404,0.5,0.577350269);\n  p = abs(p);\n  p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;\n  p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n  return length(p)*sign(p.y);\n}\n\nfloat sdOctogon(vec2 p, float r) {\n  vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623 );\n  p = abs(p);\n  p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);\n  p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);\n  p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);\n  return length(p)*sign(p.y);\n}\n\nfloat sdHexagram(vec2 p, float r) {\n  vec4 k=vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);\n  p = abs(p);\n  p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;\n  p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;\n  p -= vec2(clamp(p.x,r*k.z,r*k.w),r);\n  return length(p)*sign(p.y);\n}\n\nfloat sdRhombus(vec2 p, vec2 b) {\n  vec2 q = abs(p);\n  float h = clamp((-2.0*ndot(q,b)+ndot(b,b))/dot(b,b),-1.0,1.0);\n  float d = length( q - 0.5*b*vec2(1.0-h,1.0+h) );\n  return d * sign( q.x*b.y + q.y*b.x - b.x*b.y );\n}\n\nfloat sdVesica(vec2 p, float r, float d) {\n  p = abs(p);\n  float b = sqrt(r*r-d*d); // can delay this sqrt\n  return ((p.y-b)*d>p.x*b)\n          ? length(p-vec2(0.0,b))\n          : length(p-vec2(-d,0.0))-r;\n}";
var precisionRegExp = /precision\s+(high|low|medium)p\s+float/;
var globalDefaultprecision = '#ifdef GL_FRAGMENT_PRECISION_HIGH\n precision highp float;\n #else\n precision mediump float;\n#endif\n';
var includeRegExp = /#pragma include (["^+"]?["\ "[a-zA-Z_0-9](.*)"]*?)/g;
var ShaderModuleService = (_dec = (0, _inversify.injectable)(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function ShaderModuleService() {
    (0, _classCallCheck2.default)(this, ShaderModuleService);
    this.moduleCache = {};
    this.rawContentCache = {};
  }

  (0, _createClass2.default)(ShaderModuleService, [{
    key: "registerBuiltinModules",
    value: function registerBuiltinModules() {
      this.destroy();
      this.registerModule('picking', {
        vs: pickingVert,
        fs: pickingFrag
      });
      this.registerModule('sdf2d', {
        vs: '',
        fs: sdf2dFrag
      });
    }
  }, {
    key: "registerModule",
    value: function registerModule(moduleName, moduleParams) {
      // prevent registering the same module multiple times
      if (this.rawContentCache[moduleName]) {
        return;
      }

      var _moduleParams$vs = moduleParams.vs,
          vs = _moduleParams$vs === void 0 ? '' : _moduleParams$vs,
          _moduleParams$fs = moduleParams.fs,
          fs = _moduleParams$fs === void 0 ? '' : _moduleParams$fs,
          declaredUniforms = moduleParams.uniforms;

      var _extractUniforms = (0, _shaderModule.extractUniforms)(vs),
          extractedVS = _extractUniforms.content,
          vsUniforms = _extractUniforms.uniforms;

      var _extractUniforms2 = (0, _shaderModule.extractUniforms)(fs),
          extractedFS = _extractUniforms2.content,
          fsUniforms = _extractUniforms2.uniforms;

      this.rawContentCache[moduleName] = {
        fs: extractedFS,
        uniforms: _objectSpread(_objectSpread(_objectSpread({}, vsUniforms), fsUniforms), declaredUniforms),
        vs: extractedVS
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.moduleCache = {};
      this.rawContentCache = {};
    }
  }, {
    key: "getModule",
    value: function getModule(moduleName) {
      var _this = this;

      if (this.moduleCache[moduleName]) {
        return this.moduleCache[moduleName];
      }

      var rawVS = this.rawContentCache[moduleName].vs || '';
      var rawFS = this.rawContentCache[moduleName].fs || '';

      var _this$processModule = this.processModule(rawVS, [], 'vs'),
          vs = _this$processModule.content,
          vsIncludeList = _this$processModule.includeList;

      var _this$processModule2 = this.processModule(rawFS, [], 'fs'),
          fs = _this$processModule2.content,
          fsIncludeList = _this$processModule2.includeList;

      var compiledFs = fs; // TODO: extract uniforms and their default values from GLSL

      var uniforms = (0, _uniq.uniq)(vsIncludeList.concat(fsIncludeList).concat(moduleName)).reduce(function (prev, cur) {
        return _objectSpread(_objectSpread({}, prev), _this.rawContentCache[cur].uniforms);
      }, {});
      /**
       * set default precision for fragment shader
       * https://stackoverflow.com/questions/28540290/why-it-is-necessary-to-set-precision-for-the-fragment-shader
       */

      if (!precisionRegExp.test(fs)) {
        compiledFs = globalDefaultprecision + fs;
      }

      this.moduleCache[moduleName] = {
        fs: compiledFs.trim(),
        uniforms: uniforms,
        vs: vs.trim()
      };
      return this.moduleCache[moduleName];
    }
  }, {
    key: "processModule",
    value: function processModule(rawContent, includeList, type) {
      var _this2 = this;

      var compiled = rawContent.replace(includeRegExp, function (_, strMatch) {
        var includeOpt = strMatch.split(' ');
        var includeName = includeOpt[0].replace(/"/g, '');

        if (includeList.indexOf(includeName) > -1) {
          return '';
        }

        var txt = _this2.rawContentCache[includeName][type];
        includeList.push(includeName);

        var _this2$processModule = _this2.processModule(txt || '', includeList, type),
            content = _this2$processModule.content;

        return content;
      });
      return {
        content: compiled,
        includeList: includeList
      };
    }
  }]);
  return ShaderModuleService;
}(), _temp)) || _class);
exports.default = ShaderModuleService;
//# sourceMappingURL=ShaderModuleService.js.map