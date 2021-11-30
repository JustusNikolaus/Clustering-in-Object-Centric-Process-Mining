import { IModel, IModelDrawOptions, IModelInitializationOptions, IUniform } from '@antv/g-webgpu-core';
import { WebGPUEngine } from '.';
export default class WebGPUModel implements IModel {
    private engine;
    private options;
    private pipelineLayout;
    private renderPipeline;
    private uniformsBindGroupLayout;
    private uniformBindGroup;
    private uniformBuffer;
    private uniforms;
    /**
     * 用于后续渲染时动态更新
     */
    private uniformGPUBufferLayout;
    /**
     * vertex
     */
    private attributeCache;
    /**
     * indices's buffer
     */
    private indexBuffer;
    private indexCount;
    constructor(engine: WebGPUEngine, options: IModelInitializationOptions);
    init(): Promise<void>;
    addUniforms(uniforms: {
        [key: string]: IUniform;
    }): void;
    draw(options: IModelDrawOptions): void;
    destroy(): void;
    private compilePipelineStageDescriptor;
    private compileShaderToSpirV;
    private compileRawShaderToSpirV;
    private createPipelineStageDescriptor;
    /**
     * @see https://gpuweb.github.io/gpuweb/#rasterization-state
     */
    private getDefaultRasterizationStateDescriptor;
    private buildUniformBindGroup;
}
