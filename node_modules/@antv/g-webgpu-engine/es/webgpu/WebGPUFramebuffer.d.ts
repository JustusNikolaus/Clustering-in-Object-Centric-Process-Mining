/// <reference types="@webgpu/types" />
import { IFramebuffer, IFramebufferInitializationOptions } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUFramebuffer implements IFramebuffer {
    private engine;
    private options;
    private colorTexture;
    private depthTexture;
    private width;
    private height;
    constructor(engine: WebGPUEngine, options: IFramebufferInitializationOptions);
    get(): {
        color: {
            texture: GPUTexture;
            sampler: GPUSampler;
        } | undefined;
        depth: {
            texture: GPUTexture;
            sampler: GPUSampler;
        } | undefined;
    };
    destroy(): void;
    resize({ width, height }: {
        width: number;
        height: number;
    }): void;
}
