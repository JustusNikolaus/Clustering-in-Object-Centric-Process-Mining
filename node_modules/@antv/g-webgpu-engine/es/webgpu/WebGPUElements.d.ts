import { BufferData, IBuffer, IElements, IElementsInitializationOptions } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUElements implements IElements {
    private engine;
    private options;
    indexCount: number;
    private buffer;
    constructor(engine: WebGPUEngine, options: IElementsInitializationOptions);
    get(): IBuffer;
    subData(options: {
        data: BufferData;
        offset: number;
    }): void;
    destroy(): void;
}
