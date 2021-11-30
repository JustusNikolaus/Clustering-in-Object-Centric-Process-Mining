import { vec3 } from 'gl-matrix';
import { Geometry } from '.';
export interface IBoxGeometryParams {
    halfExtents: vec3;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
}
export declare class Box extends Geometry<Partial<IBoxGeometryParams>> {
    protected onEntityCreated(): void;
}
