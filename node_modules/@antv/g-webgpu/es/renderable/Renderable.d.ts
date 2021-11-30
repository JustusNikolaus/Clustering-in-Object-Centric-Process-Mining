import { BufferData, Entity, GeometryComponent, MaterialComponent, MeshComponent, TransformComponent } from '@antv/g-webgpu-core';
export interface IRenderable<T> {
    setConfig(config: T): void;
    setAttributes(attributes: Record<string, BufferData | undefined>): void;
    setEntity(entity: Entity): void;
    setMaterial(material: MaterialComponent): void;
    setGeometry(geometry: GeometryComponent): void;
}
export declare class Renderable<T = {}> implements IRenderable<T> {
    static POINT: string;
    static LINE: string;
    static GRID: string;
    protected attributes: Record<string, BufferData>;
    protected config: T;
    private readonly mesh;
    private readonly cullable;
    private readonly transform;
    private readonly sceneGraphSystem;
    private meshComponent;
    private transformComponent;
    private entity;
    getEntity(): number;
    getTransformComponent(): TransformComponent;
    getMeshComponent(): MeshComponent;
    setConfig(config: T): void;
    setEntity(entity: Entity): void;
    setMaterial(material: MaterialComponent): this;
    setGeometry(geometry: GeometryComponent): this;
    setAttributes(attributes: Record<string, BufferData | undefined>): void;
    setVisible(visible: boolean): this;
    isVisible(): boolean;
    attach(parentRenderable: Renderable<T>): this;
    detach(): this;
    detachChildren(): this;
    protected onEntityCreated(): void;
    protected onAttributeChanged({ name, data, }: {
        name: string;
        data: BufferData;
    }): void;
    protected convertAttributeName2UniformName(attributeName: string): string;
}
