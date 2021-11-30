import { vec3 } from 'gl-matrix';
import { Camera } from './Camera';
/**
 * 保存相机状态，便于后续在多个 Landmark 间移动
 */
export default class Landmark {
    name: string;
    private matrix;
    private right;
    private up;
    private forward;
    private position;
    private focalPoint;
    private distanceVector;
    private distance;
    private dollyingStep;
    private azimuth;
    private elevation;
    private roll;
    private relAzimuth;
    private relElevation;
    private relRoll;
    constructor(name: string, c: Camera);
    getPosition(): vec3;
    getFocalPoint(): vec3;
    getRoll(): number;
    retrieve(c: Camera): void;
}
