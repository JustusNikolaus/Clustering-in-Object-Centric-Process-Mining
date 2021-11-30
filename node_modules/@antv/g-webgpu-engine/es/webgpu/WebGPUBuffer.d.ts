/// <reference types="@webgpu/types" />
import { BufferData, IBuffer, IBufferInitializationOptions } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUBuffer implements IBuffer {
    private engine;
    private options;
    private buffer;
    constructor(engine: WebGPUEngine, options: IBufferInitializationOptions);
    get(): GPUBuffer;
    destroy(): void;
    subData({ data, offset }: {
        data: BufferData;
        offset: number;
    }): void;
    private createBuffer;
    /**
     * 不同于 Babylon.js 的版本，使用最新的 GPUQueue.writeBuffer 方法
     * @see https://gpuweb.github.io/gpuweb/#dom-gpuqueue-writebuffer
     * 已废弃创建一个临时的 mapped buffer 用于拷贝数据 @see https://gpuweb.github.io/gpuweb/#GPUDevice-createBufferMapped
     * @see https://github.com/gpuweb/gpuweb/blob/master/design/BufferOperations.md#updating-data-to-an-existing-buffer-like-webgls-buffersubdata
     */
    private setSubData;
}
