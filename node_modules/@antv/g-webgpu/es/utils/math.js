import { vec3 } from 'gl-matrix';
import { isNumber } from './is-number';
export function getAngle(angle) {
  if (angle === undefined) {
    return 0;
  } else if (angle > 360 || angle < -360) {
    return angle % 360;
  }

  return angle;
}
export function createVec3(x, y, z) {
  if (isNumber(x)) {
    return vec3.fromValues(x, y, z);
  }

  if (x.length === 3) {
    return vec3.clone(x);
  } // @ts-ignore


  return vec3.fromValues(x[0], x[1], x[2]);
}
//# sourceMappingURL=math.js.map