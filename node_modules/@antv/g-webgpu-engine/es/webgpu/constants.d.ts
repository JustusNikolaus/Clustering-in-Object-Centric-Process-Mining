/// <reference types="@webgpu/types" />
import { IModelInitializationOptions } from '@antv/g-webgpu-core';
import * as WebGPUConstants from '@webgpu/types/dist/constants';
export declare const primitiveMap: {
    [key: string]: WebGPUConstants.PrimitiveTopology.PointList | WebGPUConstants.PrimitiveTopology.LineList | WebGPUConstants.PrimitiveTopology.LineStrip | WebGPUConstants.PrimitiveTopology.TriangleList | WebGPUConstants.PrimitiveTopology.TriangleStrip;
};
export declare const depthFuncMap: {
    [key: string]: WebGPUConstants.CompareFunction.Never | WebGPUConstants.CompareFunction.Always | WebGPUConstants.CompareFunction.Less | WebGPUConstants.CompareFunction.LessEqual | WebGPUConstants.CompareFunction.Greater | WebGPUConstants.CompareFunction.GreaterEqual | WebGPUConstants.CompareFunction.Equal | WebGPUConstants.CompareFunction.NotEqual;
};
export declare const blendEquationMap: {
    [key: string]: WebGPUConstants.BlendOperation.Add | WebGPUConstants.BlendOperation.Min | WebGPUConstants.BlendOperation.Max | WebGPUConstants.BlendOperation.Subtract | WebGPUConstants.BlendOperation.ReverseSubtract;
};
export declare const blendFuncMap: {
    [key: string]: WebGPUConstants.BlendFactor.Zero | WebGPUConstants.BlendFactor.One | WebGPUConstants.BlendFactor.SrcColor | WebGPUConstants.BlendFactor.OneMinusSrcColor | WebGPUConstants.BlendFactor.SrcAlpha | WebGPUConstants.BlendFactor.OneMinusSrcAlpha | WebGPUConstants.BlendFactor.DstColor | WebGPUConstants.BlendFactor.OneMinusDstColor | WebGPUConstants.BlendFactor.DstAlpha | WebGPUConstants.BlendFactor.OneMinusDstAlpha | WebGPUConstants.BlendFactor.BlendColor | WebGPUConstants.BlendFactor.OneMinusBlendColor | WebGPUConstants.BlendFactor.SrcAlphaSaturated;
};
export declare const formatMap: {
    [key: string]: 'r8unorm' | 'rgba8unorm' | 'depth32float' | 'depth24plus-stencil8';
};
export declare const filterMap: {
    [key: string]: 'nearest' | 'linear';
};
export declare const wrapModeMap: {
    [key: string]: 'repeat' | 'clamp-to-edge' | 'mirror-repeat';
};
export declare function getCullMode({ cull, }: Pick<IModelInitializationOptions, 'cull'>): 'none' | 'front' | 'back' | undefined;
export declare function getDepthStencilStateDescriptor({ depth, stencil, }: Pick<IModelInitializationOptions, 'depth' | 'stencil'>): GPUDepthStencilStateDescriptor | undefined;
/**
 * @see https://gpuweb.github.io/gpuweb/#color-state
 */
export declare function getColorStateDescriptors({ blend }: Pick<IModelInitializationOptions, 'blend'>, swapChainFormat: GPUTextureFormat): GPUColorStateDescriptor[];
