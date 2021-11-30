/// <reference types="@webgpu/types" />
import { Entity, IConfig, IRendererService, ITexture2DInitializationOptions, KernelBundle, MeshComponent, TransformComponent } from '@antv/g-webgpu-core';
import { Container } from 'inversify';
import { Camera } from './camera/Camera';
import { Kernel } from './Kernel';
import { Renderable } from './renderable/Renderable';
import { Renderer } from './Renderer';
import { Scene } from './Scene';
import { Texture2D } from './texture/Texture2D';
import { View } from './View';
export declare class World {
    static create(config?: Partial<IConfig>): World;
    private readonly configService;
    private container;
    getEngine(): Promise<IRendererService>;
    /**
     * get transform component
     * @param entity
     */
    getTransformComponent(entity: Entity): (import("@antv/g-webgpu-core").Component<TransformComponent> & TransformComponent) | null;
    getMeshComponent(entity: Entity): (import("@antv/g-webgpu-core").Component<MeshComponent> & MeshComponent) | null;
    setConfig(config: Partial<IConfig>): void;
    setContainer(container: Container): void;
    getContainer(): Container;
    createEntity(): number;
    createScene(): Scene;
    createCamera(): Camera;
    createView(): View;
    createRenderable<T>(type?: string, config?: T): Renderable<{}>;
    createGeometry<T>(type: string, config?: T): import("@antv/g-webgpu-core").GeometryComponent;
    createMaterial<T>(type: string, config?: T): import("@antv/g-webgpu-core").MaterialComponent;
    createTexture2D(config: ITexture2DInitializationOptions & {
        url: string;
    }): Texture2D;
    createBufferGeometry(params?: {
        vertexCount: number;
    }): import("@antv/g-webgpu-core").Component<import("@antv/g-webgpu-core").GeometryComponent> & import("@antv/g-webgpu-core").GeometryComponent;
    createInstancedBufferGeometry(params: {
        maxInstancedCount: number;
        vertexCount: number;
    }): import("@antv/g-webgpu-core").Component<import("@antv/g-webgpu-core").GeometryComponent> & import("@antv/g-webgpu-core").GeometryComponent;
    createShaderMaterial(params: {
        vertexShader: string;
        fragmentShader: string;
    }): import("@antv/g-webgpu-core").Component<import("@antv/g-webgpu-core").MaterialComponent> & import("@antv/g-webgpu-core").MaterialComponent;
    createKernel(precompiledBundle: KernelBundle | string): Kernel;
    createRenderer(): Renderer;
    destroy(): void;
}
