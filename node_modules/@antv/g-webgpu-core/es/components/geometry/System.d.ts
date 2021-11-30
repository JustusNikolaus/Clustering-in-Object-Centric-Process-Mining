import { ISystem } from '../..';
import { GeometryComponent } from './GeometryComponent';
export declare class GeometrySystem implements ISystem {
    private readonly geometry;
    private readonly engine;
    execute(): Promise<void>;
    tearDown(): void;
    /**
     * @see https://threejs.org/docs/#api/en/core/BufferGeometry
     */
    createBufferGeometry({ vertexCount }?: {
        vertexCount: number;
    }): import("../..").Component<GeometryComponent> & GeometryComponent;
    /**
     * @see https://threejs.org/docs/#api/en/core/InstancedBufferGeometry
     */
    createInstancedBufferGeometry({ maxInstancedCount, vertexCount, }: {
        maxInstancedCount: number;
        vertexCount: number;
    }): import("../..").Component<GeometryComponent> & GeometryComponent;
}
