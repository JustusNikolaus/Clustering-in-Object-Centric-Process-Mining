/// <reference types="@webgpu/types" />
/**
 * implements renderService with WebGPU API
 * @see https://webgpu.io/
 * @see https://github.com/BabylonJS/Babylon.js/blob/WebGPU/src/Engines/webgpuEngine.ts
 */
import { GLSLContext, IAttribute, IAttributeInitializationOptions, IBuffer, IBufferInitializationOptions, IClearOptions, IElements, IElementsInitializationOptions, IFramebuffer, IFramebufferInitializationOptions, IModel, IModelInitializationOptions, IReadPixelsOptions, IRendererConfig, IRendererService, ITexture2D, ITexture2DInitializationOptions } from '@antv/g-webgpu-core';
import WebGPUComputeModel from './WebGPUComputeModel';
import WebGPUFramebuffer from './WebGPUFramebuffer';
/**
 * regl renderer
 */
export declare class WebGPUEngine implements IRendererService {
    supportWebGPU: boolean;
    useWGSL: boolean;
    options: IRendererConfig;
    canvas: HTMLCanvasElement;
    context: GPUCanvasContext;
    glslang: any;
    adapter: GPUAdapter;
    device: GPUDevice;
    swapChain: GPUSwapChain;
    mainPassSampleCount: number;
    mainTexture: GPUTexture;
    depthTexture: GPUTexture;
    mainColorAttachments: GPURenderPassColorAttachmentDescriptor[];
    mainTextureExtends: GPUExtent3D;
    mainDepthAttachment: GPURenderPassDepthStencilAttachmentDescriptor;
    uploadEncoder: GPUCommandEncoder;
    renderEncoder: GPUCommandEncoder;
    computeEncoder: GPUCommandEncoder;
    renderTargetEncoder: GPUCommandEncoder;
    commandBuffers: GPUCommandBuffer[];
    currentRenderPass: GPURenderPassEncoder | null;
    mainRenderPass: GPURenderPassEncoder | null;
    currentRenderTargetViewDescriptor: GPUTextureViewDescriptor;
    currentComputePass: GPUComputePassEncoder | null;
    bundleEncoder: GPURenderBundleEncoder | null;
    tempBuffers: GPUBuffer[];
    currentRenderTarget: WebGPUFramebuffer | null;
    readonly uploadEncoderDescriptor: {
        label: string;
    };
    readonly renderEncoderDescriptor: {
        label: string;
    };
    readonly renderTargetEncoderDescriptor: {
        label: string;
    };
    readonly computeEncoderDescriptor: {
        label: string;
    };
    /**
     * 通过名称访问
     */
    private pipelines;
    private computePipelines;
    private readonly defaultSampleCount;
    private readonly clearDepthValue;
    private readonly clearStencilValue;
    private transientViewport;
    private cachedViewport;
    isFloatSupported(): boolean;
    init(config: IRendererConfig): Promise<void>;
    setScissor(scissor: Partial<{
        enable: boolean;
        box: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>): void;
    clear: (options: IClearOptions) => void;
    createModel: (options: IModelInitializationOptions) => Promise<IModel>;
    createAttribute: (options: IAttributeInitializationOptions) => IAttribute;
    createBuffer: (options: IBufferInitializationOptions) => IBuffer;
    createElements: (options: IElementsInitializationOptions) => IElements;
    createTexture2D: (options: ITexture2DInitializationOptions) => ITexture2D;
    createFramebuffer: (options: IFramebufferInitializationOptions) => IFramebuffer;
    useFramebuffer: (framebuffer: IFramebuffer | null, drawCommands: () => void) => void;
    createComputeModel: (context: GLSLContext) => Promise<WebGPUComputeModel>;
    getCanvas: () => HTMLCanvasElement;
    getGLContext: () => WebGLRenderingContext;
    viewport: ({ x, y, width, height, }: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    readPixels: (options: IReadPixelsOptions) => Uint8Array;
    destroy(): void;
    beginFrame(): void;
    endFrame(): void;
    getCurrentRenderPass(): GPURenderPassEncoder;
    private initGlslang;
    private initContextAndSwapChain;
    private initMainAttachments;
    private startComputePass;
    private startMainRenderPass;
    private startRenderTargetRenderPass;
    private endMainRenderPass;
    private endComputePass;
    private endRenderTargetRenderPass;
    private resetCachedViewport;
    private unbindFramebuffer;
}
