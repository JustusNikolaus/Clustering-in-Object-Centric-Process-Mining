"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAngle = getAngle;
exports.createVec3 = createVec3;

var _glMatrix = require("gl-matrix");

var _isNumber = require("./is-number");

function getAngle(angle) {
  if (angle === undefined) {
    return 0;
  } else if (angle > 360 || angle < -360) {
    return angle % 360;
  }

  return angle;
}

function createVec3(x, y, z) {
  if ((0, _isNumber.isNumber)(x)) {
    return _glMatrix.vec3.fromValues(x, y, z);
  }

  if (x.length === 3) {
    return _glMatrix.vec3.clone(x);
  } // @ts-ignore


  return _glMatrix.vec3.fromValues(x[0], x[1], x[2]);
}
//# sourceMappingURL=math.js.map