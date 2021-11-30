import { vec3 } from 'gl-matrix';
import { AABB } from './AABB';
import { BoundingSphere } from './BoundingSphere';
import { Plane } from './Plane';
/**
 * 包含求交方法：
 * * intersectsShape(Shape, intersection) 返回交点和求交结果
 * @see https://github.com/playcanvas/engine/blob/master/src/shape/bounding-box.js#L161
 * @see https://github.com/mrdoob/three.js/blob/dev/src/math/Ray.js
 */
export declare class Ray {
    origin: vec3;
    direction: vec3;
    constructor(origin: vec3, direction: vec3);
    intersectsAABB(aabb: AABB, intersection?: vec3): boolean;
    intersectsSphere(sphere: BoundingSphere, intersection?: vec3): boolean | null;
    intersectsPlane(plane: Plane, intersection?: vec3): boolean;
    /**
     * faster than implements like Three.js
     * @see https://github.com/playcanvas/engine/blob/master/src/shape/bounding-box.js#L161
     */
    private intersectsAABBWithoutIntersection;
    private intersectAABBWithIntersection;
}
