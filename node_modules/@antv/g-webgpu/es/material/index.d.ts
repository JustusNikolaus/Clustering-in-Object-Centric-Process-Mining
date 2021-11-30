import { Entity, MaterialComponent } from '@antv/g-webgpu-core';
export interface IMaterial<T> {
    setConfig(config: T): void;
}
export declare class Material<T = {}> implements IMaterial<T> {
    static BASIC: string;
    protected config: T;
    private readonly material;
    private entity;
    private component;
    getEntity(): number;
    getComponent(): MaterialComponent;
    setConfig(config: T): void;
    setEntity(entity: Entity, type: string): void;
    protected onEntityCreated(): void;
}
