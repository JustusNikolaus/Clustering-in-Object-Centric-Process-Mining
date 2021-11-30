import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _primitiveMap, _depthFuncMap, _blendEquationMap, _blendFuncMap, _formatMap, _filterMap, _wrapModeMap;

import { gl } from '@antv/g-webgpu-core';
import * as WebGPUConstants from '@webgpu/types/dist/constants'; // WebGPU 不支持 LINE_LOOP & TRIANGLE_FAN

export var primitiveMap = (_primitiveMap = {}, _defineProperty(_primitiveMap, gl.POINTS, WebGPUConstants.PrimitiveTopology.PointList), _defineProperty(_primitiveMap, gl.LINES, WebGPUConstants.PrimitiveTopology.LineList), _defineProperty(_primitiveMap, gl.LINE_LOOP, WebGPUConstants.PrimitiveTopology.LineList), _defineProperty(_primitiveMap, gl.LINE_STRIP, WebGPUConstants.PrimitiveTopology.LineStrip), _defineProperty(_primitiveMap, gl.TRIANGLES, WebGPUConstants.PrimitiveTopology.TriangleList), _defineProperty(_primitiveMap, gl.TRIANGLE_FAN, WebGPUConstants.PrimitiveTopology.TriangleList), _defineProperty(_primitiveMap, gl.TRIANGLE_STRIP, WebGPUConstants.PrimitiveTopology.TriangleStrip), _primitiveMap);
export var depthFuncMap = (_depthFuncMap = {}, _defineProperty(_depthFuncMap, gl.NEVER, WebGPUConstants.CompareFunction.Never), _defineProperty(_depthFuncMap, gl.ALWAYS, WebGPUConstants.CompareFunction.Always), _defineProperty(_depthFuncMap, gl.LESS, WebGPUConstants.CompareFunction.Less), _defineProperty(_depthFuncMap, gl.LEQUAL, WebGPUConstants.CompareFunction.LessEqual), _defineProperty(_depthFuncMap, gl.GREATER, WebGPUConstants.CompareFunction.Greater), _defineProperty(_depthFuncMap, gl.GEQUAL, WebGPUConstants.CompareFunction.GreaterEqual), _defineProperty(_depthFuncMap, gl.EQUAL, WebGPUConstants.CompareFunction.Equal), _defineProperty(_depthFuncMap, gl.NOTEQUAL, WebGPUConstants.CompareFunction.NotEqual), _depthFuncMap);
export var blendEquationMap = (_blendEquationMap = {}, _defineProperty(_blendEquationMap, gl.FUNC_ADD, WebGPUConstants.BlendOperation.Add), _defineProperty(_blendEquationMap, gl.MIN_EXT, WebGPUConstants.BlendOperation.Min), _defineProperty(_blendEquationMap, gl.MAX_EXT, WebGPUConstants.BlendOperation.Max), _defineProperty(_blendEquationMap, gl.FUNC_SUBTRACT, WebGPUConstants.BlendOperation.Subtract), _defineProperty(_blendEquationMap, gl.FUNC_REVERSE_SUBTRACT, WebGPUConstants.BlendOperation.ReverseSubtract), _blendEquationMap); // @see https://gpuweb.github.io/gpuweb/#blend-state
// 不支持 'constant alpha' 和 'one minus constant alpha'

export var blendFuncMap = (_blendFuncMap = {}, _defineProperty(_blendFuncMap, gl.ZERO, WebGPUConstants.BlendFactor.Zero), _defineProperty(_blendFuncMap, gl.ONE, WebGPUConstants.BlendFactor.One), _defineProperty(_blendFuncMap, gl.SRC_COLOR, WebGPUConstants.BlendFactor.SrcColor), _defineProperty(_blendFuncMap, gl.ONE_MINUS_SRC_COLOR, WebGPUConstants.BlendFactor.OneMinusSrcColor), _defineProperty(_blendFuncMap, gl.SRC_ALPHA, WebGPUConstants.BlendFactor.SrcAlpha), _defineProperty(_blendFuncMap, gl.ONE_MINUS_SRC_ALPHA, WebGPUConstants.BlendFactor.OneMinusSrcAlpha), _defineProperty(_blendFuncMap, gl.DST_COLOR, WebGPUConstants.BlendFactor.DstColor), _defineProperty(_blendFuncMap, gl.ONE_MINUS_DST_COLOR, WebGPUConstants.BlendFactor.OneMinusDstColor), _defineProperty(_blendFuncMap, gl.DST_ALPHA, WebGPUConstants.BlendFactor.DstAlpha), _defineProperty(_blendFuncMap, gl.ONE_MINUS_DST_ALPHA, WebGPUConstants.BlendFactor.OneMinusDstAlpha), _defineProperty(_blendFuncMap, gl.CONSTANT_COLOR, WebGPUConstants.BlendFactor.BlendColor), _defineProperty(_blendFuncMap, gl.ONE_MINUS_CONSTANT_COLOR, WebGPUConstants.BlendFactor.OneMinusBlendColor), _defineProperty(_blendFuncMap, gl.SRC_ALPHA_SATURATE, WebGPUConstants.BlendFactor.SrcAlphaSaturated), _blendFuncMap); // @see https://gpuweb.github.io/gpuweb/#texture-formats

export var formatMap = (_formatMap = {}, _defineProperty(_formatMap, gl.ALPHA, 'r8unorm'), _defineProperty(_formatMap, gl.RGBA, 'rgba8unorm'), _defineProperty(_formatMap, gl.DEPTH_COMPONENT, 'depth32float'), _defineProperty(_formatMap, gl.DEPTH_STENCIL, 'depth24plus-stencil8'), _formatMap); // @see https://gpuweb.github.io/gpuweb/#enumdef-gpufiltermode

export var filterMap = (_filterMap = {}, _defineProperty(_filterMap, gl.NEAREST, 'nearest'), _defineProperty(_filterMap, gl.LINEAR, 'linear'), _filterMap); // @see https://gpuweb.github.io/gpuweb/#enumdef-gpuaddressmode

export var wrapModeMap = (_wrapModeMap = {}, _defineProperty(_wrapModeMap, gl.REPEAT, 'repeat'), _defineProperty(_wrapModeMap, gl.CLAMP_TO_EDGE, 'clamp-to-edge'), _defineProperty(_wrapModeMap, gl.MIRRORED_REPEAT, 'mirror-repeat'), _wrapModeMap);
export function getCullMode(_ref) {
  var cull = _ref.cull;

  if (!cull || !cull.enable) {
    return WebGPUConstants.CullMode.None;
  }

  if (cull.face) {
    return cull.face === gl.FRONT ? WebGPUConstants.CullMode.Front : WebGPUConstants.CullMode.Back;
  }
}
export function getDepthStencilStateDescriptor(_ref2) {
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
    depthCompare: depthFuncMap[(depth === null || depth === void 0 ? void 0 : depth.func) || gl.ALWAYS],
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

export function getColorStateDescriptors(_ref3, swapChainFormat) {
  var blend = _ref3.blend;
  return [{
    format: swapChainFormat,
    // https://gpuweb.github.io/gpuweb/#blend-state
    alphaBlend: {
      srcFactor: blendFuncMap[blend && blend.func && blend.func.srcAlpha || gl.ONE],
      dstFactor: blendFuncMap[blend && blend.func && blend.func.dstAlpha || gl.ZERO],
      operation: blendEquationMap[blend && blend.equation && blend.equation.alpha || gl.FUNC_ADD]
    },
    colorBlend: {
      srcFactor: blendFuncMap[blend && blend.func && blend.func.srcRGB || gl.ONE],
      dstFactor: blendFuncMap[blend && blend.func && blend.func.dstRGB || gl.ZERO],
      operation: blendEquationMap[blend && blend.equation && blend.equation.rgb || gl.FUNC_ADD]
    },
    writeMask: WebGPUConstants.ColorWrite.All
  }];
}
//# sourceMappingURL=constants.js.map