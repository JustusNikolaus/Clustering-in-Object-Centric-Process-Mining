"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCullMode = getCullMode;
exports.getDepthStencilStateDescriptor = getDepthStencilStateDescriptor;
exports.getColorStateDescriptors = getColorStateDescriptors;
exports.wrapModeMap = exports.filterMap = exports.formatMap = exports.blendFuncMap = exports.blendEquationMap = exports.depthFuncMap = exports.primitiveMap = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _primitiveMap, _depthFuncMap, _blendEquationMap, _blendFuncMap, _formatMap, _filterMap, _wrapModeMap;

// WebGPU 不支持 LINE_LOOP & TRIANGLE_FAN
var primitiveMap = (_primitiveMap = {}, (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.POINTS, WebGPUConstants.PrimitiveTopology.PointList), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINES, WebGPUConstants.PrimitiveTopology.LineList), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINE_LOOP, WebGPUConstants.PrimitiveTopology.LineList), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.LINE_STRIP, WebGPUConstants.PrimitiveTopology.LineStrip), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLES, WebGPUConstants.PrimitiveTopology.TriangleList), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLE_FAN, WebGPUConstants.PrimitiveTopology.TriangleList), (0, _defineProperty2.default)(_primitiveMap, _gWebgpuCore.gl.TRIANGLE_STRIP, WebGPUConstants.PrimitiveTopology.TriangleStrip), _primitiveMap);
exports.primitiveMap = primitiveMap;
var depthFuncMap = (_depthFuncMap = {}, (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.NEVER, WebGPUConstants.CompareFunction.Never), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.ALWAYS, WebGPUConstants.CompareFunction.Always), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.LESS, WebGPUConstants.CompareFunction.Less), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.LEQUAL, WebGPUConstants.CompareFunction.LessEqual), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.GREATER, WebGPUConstants.CompareFunction.Greater), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.GEQUAL, WebGPUConstants.CompareFunction.GreaterEqual), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.EQUAL, WebGPUConstants.CompareFunction.Equal), (0, _defineProperty2.default)(_depthFuncMap, _gWebgpuCore.gl.NOTEQUAL, WebGPUConstants.CompareFunction.NotEqual), _depthFuncMap);
exports.depthFuncMap = depthFuncMap;
var blendEquationMap = (_blendEquationMap = {}, (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_ADD, WebGPUConstants.BlendOperation.Add), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.MIN_EXT, WebGPUConstants.BlendOperation.Min), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.MAX_EXT, WebGPUConstants.BlendOperation.Max), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_SUBTRACT, WebGPUConstants.BlendOperation.Subtract), (0, _defineProperty2.default)(_blendEquationMap, _gWebgpuCore.gl.FUNC_REVERSE_SUBTRACT, WebGPUConstants.BlendOperation.ReverseSubtract), _blendEquationMap); // @see https://gpuweb.github.io/gpuweb/#blend-state
// 不支持 'constant alpha' 和 'one minus constant alpha'

exports.blendEquationMap = blendEquationMap;
var blendFuncMap = (_blendFuncMap = {}, (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ZERO, WebGPUConstants.BlendFactor.Zero), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE, WebGPUConstants.BlendFactor.One), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_COLOR, WebGPUConstants.BlendFactor.SrcColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_SRC_COLOR, WebGPUConstants.BlendFactor.OneMinusSrcColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_ALPHA, WebGPUConstants.BlendFactor.SrcAlpha), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_SRC_ALPHA, WebGPUConstants.BlendFactor.OneMinusSrcAlpha), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.DST_COLOR, WebGPUConstants.BlendFactor.DstColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_DST_COLOR, WebGPUConstants.BlendFactor.OneMinusDstColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.DST_ALPHA, WebGPUConstants.BlendFactor.DstAlpha), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_DST_ALPHA, WebGPUConstants.BlendFactor.OneMinusDstAlpha), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.CONSTANT_COLOR, WebGPUConstants.BlendFactor.BlendColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.ONE_MINUS_CONSTANT_COLOR, WebGPUConstants.BlendFactor.OneMinusBlendColor), (0, _defineProperty2.default)(_blendFuncMap, _gWebgpuCore.gl.SRC_ALPHA_SATURATE, WebGPUConstants.BlendFactor.SrcAlphaSaturated), _blendFuncMap); // @see https://gpuweb.github.io/gpuweb/#texture-formats

exports.blendFuncMap = blendFuncMap;
var formatMap = (_formatMap = {}, (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.ALPHA, 'r8unorm'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.RGBA, 'rgba8unorm'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.DEPTH_COMPONENT, 'depth32float'), (0, _defineProperty2.default)(_formatMap, _gWebgpuCore.gl.DEPTH_STENCIL, 'depth24plus-stencil8'), _formatMap); // @see https://gpuweb.github.io/gpuweb/#enumdef-gpufiltermode

exports.formatMap = formatMap;
var filterMap = (_filterMap = {}, (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.NEAREST, 'nearest'), (0, _defineProperty2.default)(_filterMap, _gWebgpuCore.gl.LINEAR, 'linear'), _filterMap); // @see https://gpuweb.github.io/gpuweb/#enumdef-gpuaddressmode

exports.filterMap = filterMap;
var wrapModeMap = (_wrapModeMap = {}, (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.REPEAT, 'repeat'), (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.CLAMP_TO_EDGE, 'clamp-to-edge'), (0, _defineProperty2.default)(_wrapModeMap, _gWebgpuCore.gl.MIRRORED_REPEAT, 'mirror-repeat'), _wrapModeMap);
exports.wrapModeMap = wrapModeMap;

function getCullMode(_ref) {
  var cull = _ref.cull;

  if (!cull || !cull.enable) {
    return WebGPUConstants.CullMode.None;
  }

  if (cull.face) {
    return cull.face === _gWebgpuCore.gl.FRONT ? WebGPUConstants.CullMode.Front : WebGPUConstants.CullMode.Back;
  }
}

function getDepthStencilStateDescriptor(_ref2) {
  var depth = _ref2.depth,
      stencil = _ref2.stencil;
  // TODO: stencil
  var stencilFrontBack = {
    compare: WebGPUConstants.CompareFunction.Always,
    depthFailOp: WebGPUConstants.StencilOperation.Keep,
    failOp: WebGPUConstants.StencilOperation.Keep,
    passOp: WebGPUConstants.StencilOperation.Keep
  };
  return {
    depthWriteEnabled: depth && depth.enable,
    depthCompare: depthFuncMap[(depth === null || depth === void 0 ? void 0 : depth.func) || _gWebgpuCore.gl.ALWAYS],
    format: WebGPUConstants.TextureFormat.Depth24PlusStencil8,
    stencilFront: stencilFrontBack,
    stencilBack: stencilFrontBack,
    stencilReadMask: 0xffffffff,
    stencilWriteMask: 0xffffffff
  };
}
/**
 * @see https://gpuweb.github.io/gpuweb/#color-state
 */


function getColorStateDescriptors(_ref3, swapChainFormat) {
  var blend = _ref3.blend;
  return [{
    format: swapChainFormat,
    // https://gpuweb.github.io/gpuweb/#blend-state
    alphaBlend: {
      srcFactor: blendFuncMap[blend && blend.func && blend.func.srcAlpha || _gWebgpuCore.gl.ONE],
      dstFactor: blendFuncMap[blend && blend.func && blend.func.dstAlpha || _gWebgpuCore.gl.ZERO],
      operation: blendEquationMap[blend && blend.equation && blend.equation.alpha || _gWebgpuCore.gl.FUNC_ADD]
    },
    colorBlend: {
      srcFactor: blendFuncMap[blend && blend.func && blend.func.srcRGB || _gWebgpuCore.gl.ONE],
      dstFactor: blendFuncMap[blend && blend.func && blend.func.dstRGB || _gWebgpuCore.gl.ZERO],
      operation: blendEquationMap[blend && blend.equation && blend.equation.rgb || _gWebgpuCore.gl.FUNC_ADD]
    },
    writeMask: WebGPUConstants.ColorWrite.All
  }];
}
//# sourceMappingURL=constants.js.map