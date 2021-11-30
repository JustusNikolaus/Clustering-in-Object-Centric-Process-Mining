"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAABBFromVertices = generateAABBFromVertices;

var _glMatrix = require("gl-matrix");

var _AABB = require("../shape/AABB");

/**
 * generate AABB with positions
 * @param positions [x1,y1,z1, x2,y2,z2]
 */
function generateAABBFromVertices(positions) {
  var aabb = new _AABB.AABB();

  var min = _glMatrix.vec3.fromValues(positions[0], positions[1], positions[2]);

  var max = _glMatrix.vec3.fromValues(positions[0], positions[1], positions[2]);

  for (var i = 3; i < positions.length;) {
    var x = positions[i++];
    var y = positions[i++];
    var z = positions[i++];

    if (x < min[0]) {
      min[0] = x;
    }

    if (y < min[1]) {
      min[1] = y;
    }

    if (z < min[2]) {
      min[2] = z;
    }

    if (x > max[0]) {
      max[0] = x;
    }

    if (y > max[1]) {
      max[1] = y;
    }

    if (z > max[2]) {
      max[2] = z;
    }
  }

  aabb.setMinMax(min, max);
  return aabb;
}
//# sourceMappingURL=aabb.js.map