import { vec3 } from 'gl-matrix';
import { Plane } from './Plane';
/**
 * Axis-Aligned Bounding Box
 * 为了便于后续 Frustum Culling，通过查找表定义 p-vertex 和 n-vertex
 * @see https://github.com/antvis/GWebGPUEngine/issues/3
 */
export declare class AABB {
    center: vec3;
    halfExtents: vec3;
    private min;
    private max;
    constructor(center?: vec3, halfExtents?: vec3);
    update(center?: vec3, halfExtents?: vec3): void;
    setMinMax(min: vec3, max: vec3): void;
    getMin(): vec3;
    getMax(): vec3;
    add(aabb: AABB): void;
    intersects(aabb: AABB): boolean;
    containsPoint(point: vec3): boolean;
    /**
     * get n-vertex
     * @param plane plane of CullingVolume
     */
    getNegativeFarPoint(plane: Plane): vec3;
    /**
     * get p-vertex
     * @param plane plane of CullingVolume
     */
    getPositiveFarPoint(plane: Plane): vec3;
}
