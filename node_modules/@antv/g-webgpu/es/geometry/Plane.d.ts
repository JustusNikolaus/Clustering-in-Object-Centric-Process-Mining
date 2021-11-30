import { vec3 } from 'gl-matrix';
import { Geometry } from '.';
export interface IPlaneGeometryParams {
    halfExtents: vec3;
    widthSegments: number;
    lengthSegments: number;
}
export declare class Plane extends Geometry<Partial<IPlaneGeometryParams>> {
    protected onEntityCreated(): void;
}
