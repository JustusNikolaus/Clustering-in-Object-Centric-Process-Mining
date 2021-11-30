import { mat4 } from 'gl-matrix';
import { Entity } from '../..';
import { Component } from '../../ComponentManager';
import { NonFunctionProperties } from '../../ComponentManager';
import { AABB } from '../../shape/AABB';
import { IBuffer } from '../renderer/IBuffer';
import { IElements } from '../renderer/IElements';
import { BufferData } from '../renderer/IRendererService';
export declare class GeometryComponent extends Component<GeometryComponent> {
    dirty: boolean;
    attributes: Array<{
        dirty: boolean;
        name: string;
        data?: BufferData;
        buffer?: IBuffer;
        bufferGetter?: () => IBuffer;
    } & GPUVertexBufferLayoutDescriptor>;
    indices: Uint32Array | null;
    indicesBuffer: IElements | null;
    vertexCount: number;
    maxInstancedCount: number;
    aabb: AABB;
    entity: Entity;
    constructor(data: Partial<NonFunctionProperties<GeometryComponent>>);
    /**
     * @see https://threejs.org/docs/#api/en/core/BufferAttribute
     */
    setAttribute(name: string, data: BufferData, descriptor: GPUVertexBufferLayoutDescriptor, bufferGetter?: () => IBuffer): this;
    setIndex(data: number[] | Uint8Array | Uint16Array | Uint32Array): this;
    /**
     * when merge all the geometries into one, we need to transform every vertex's position
     * and every face's normal
     */
    applyMatrix(matrix: mat4): void;
}
