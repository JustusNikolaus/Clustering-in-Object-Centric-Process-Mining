import { GLSLContext, IComputeModel } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUComputeModel implements IComputeModel {
    private engine;
    private context;
    private entity;
    /**
     * 用于后续渲染时动态更新
     */
    private uniformGPUBufferLayout;
    private uniformBuffer;
    private vertexBuffers;
    private outputBuffer;
    private bindGroupEntries;
    private bindGroup;
    private computePipeline;
    constructor(engine: WebGPUEngine, context: GLSLContext);
    init(): Promise<void>;
    destroy(): void;
    readData(): Promise<Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array>;
    run(): void;
    updateBuffer(bufferName: string, data: number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array, offset?: number): void;
    updateUniform(uniformName: string, data: number | number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array): void;
    confirmInput(model: IComputeModel, inputName: string): void;
    private compileShaderToSpirV;
    private compileRawShaderToSpirV;
    private compileComputePipelineStageDescriptor;
}
