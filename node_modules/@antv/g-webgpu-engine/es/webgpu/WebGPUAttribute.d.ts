/// <reference types="@webgpu/types" />
import { BufferData, IAttribute, IAttributeInitializationOptions } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUAttribute implements IAttribute {
    private engine;
    private options;
    private attribute;
    private buffer;
    constructor(engine: WebGPUEngine, options: IAttributeInitializationOptions);
    get(): {
        buffer: GPUBuffer;
        offset: number;
        stride: number;
        normalized: boolean;
        divisor: number;
        size?: number | undefined;
        arrayStride: number;
        stepMode: GPUInputStepMode;
        attributes: Iterable<GPUVertexAttributeDescriptor>;
    };
    updateBuffer(options: {
        data: BufferData;
        offset: number;
    }): void;
    destroy(): void;
}
