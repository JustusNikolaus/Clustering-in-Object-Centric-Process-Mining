import { mat4 } from 'gl-matrix';
import { Plane } from './Plane';
export declare enum Mask {
    OUTSIDE = 4294967295,
    INSIDE = 0,
    INDETERMINATE = 2147483647
}
export declare class Frustum {
    planes: Plane[];
    constructor(planes?: Plane[]);
    /**
     * extract 6 planes from vpMatrix
     * @see http://www8.cs.umu.se/kurser/5DV051/HT12/lab/plane_extraction.pdf
     * @param vpMatrix viewProjectionMatrix
     */
    extractFromVPMatrix(vpMatrix: mat4): void;
}
