import { Entity, GeometryComponent } from '@antv/g-webgpu-core';
export interface IGeometry<T> {
    setConfig(config: T): void;
}
export declare class Geometry<T = {}> implements IGeometry<T> {
    static BOX: string;
    static SPHERE: string;
    static PLANE: string;
    static MERGED: string;
    protected config: T;
    private readonly geometry;
    private entity;
    private component;
    getEntity(): number;
    getComponent(): GeometryComponent;
    setConfig(config: T): void;
    setEntity(entity: Entity): void;
    protected onEntityCreated(): void;
}
