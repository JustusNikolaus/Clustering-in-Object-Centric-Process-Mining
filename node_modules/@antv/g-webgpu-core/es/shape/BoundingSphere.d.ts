import { vec3 } from 'gl-matrix';
export declare class BoundingSphere {
    center: vec3;
    radius: number;
    constructor(center?: vec3, radius?: number);
    containsPoint(point: vec3): boolean;
    intersects(sphere: BoundingSphere): boolean;
}
