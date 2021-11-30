/// <reference types="@webgpu/types" />
import { ITexture2D, ITexture2DInitializationOptions } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
export default class WebGPUTexture2D implements ITexture2D {
    private engine;
    private options;
    private texture;
    private sampler;
    private width;
    private height;
    constructor(engine: WebGPUEngine, options: ITexture2DInitializationOptions);
    get(): {
        texture: GPUTexture;
        sampler: GPUSampler;
    };
    update(): void;
    resize({ width, height }: {
        width: number;
        height: number;
    }): void;
    destroy(): void;
    private createTexture;
}
