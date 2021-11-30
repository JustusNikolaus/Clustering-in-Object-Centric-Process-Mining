import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { vec3 } from 'gl-matrix';

/**
 * Axis-Aligned Bounding Box
 * 为了便于后续 Frustum Culling，通过查找表定义 p-vertex 和 n-vertex
 * @see https://github.com/antvis/GWebGPUEngine/issues/3
 */
export var AABB = /*#__PURE__*/function () {
  function AABB(center, halfExtents) {
    _classCallCheck(this, AABB);

    this.center = void 0;
    this.halfExtents = void 0;
    this.min = vec3.create();
    this.max = vec3.create();
    this.update(center, halfExtents);
  }

  _createClass(AABB, [{
    key: "update",
    value: function update(center, halfExtents) {
      this.center = center || vec3.create();
      this.halfExtents = halfExtents || vec3.fromValues(0.5, 0.5, 0.5);
      this.min = vec3.sub(this.min, this.center, this.halfExtents);
      this.max = vec3.add(this.max, this.center, this.halfExtents);
    }
  }, {
    key: "setMinMax",
    value: function setMinMax(min, max) {
      vec3.add(this.center, max, min);
      vec3.scale(this.center, this.center, 0.5);
      vec3.sub(this.halfExtents, max, min);
      vec3.scale(this.halfExtents, this.halfExtents, 0.5);
      vec3.copy(this.min, min);
      vec3.copy(this.max, max);
    }
  }, {
    key: "getMin",
    value: function getMin() {
      return this.min;
    }
  }, {
    key: "getMax",
    value: function getMax() {
      return this.max;
    }
  }, {
    key: "add",
    value: function add(aabb) {
      var tc = this.center;
      var tcx = tc[0];
      var tcy = tc[1];
      var tcz = tc[2];
      var th = this.halfExtents;
      var thx = th[0];
      var thy = th[1];
      var thz = th[2];
      var tminx = tcx - thx;
      var tmaxx = tcx + thx;
      var tminy = tcy - thy;
      var tmaxy = tcy + thy;
      var tminz = tcz - thz;
      var tmaxz = tcz + thz;
      var oc = aabb.center;
      var ocx = oc[0];
      var ocy = oc[1];
      var ocz = oc[2];
      var oh = aabb.halfExtents;
      var ohx = oh[0];
      var ohy = oh[1];
      var ohz = oh[2];
      var ominx = ocx - ohx;
      var omaxx = ocx + ohx;
      var ominy = ocy - ohy;
      var omaxy = ocy + ohy;
      var ominz = ocz - ohz;
      var omaxz = ocz + ohz;

      if (ominx < tminx) {
        tminx = ominx;
      }

      if (omaxx > tmaxx) {
        tmaxx = omaxx;
      }

      if (ominy < tminy) {
        tminy = ominy;
      }

      if (omaxy > tmaxy) {
        tmaxy = omaxy;
      }

      if (ominz < tminz) {
        tminz = ominz;
      }

      if (omaxz > tmaxz) {
        tmaxz = omaxz;
      }

      tc[0] = (tminx + tmaxx) * 0.5;
      tc[1] = (tminy + tmaxy) * 0.5;
      tc[2] = (tminz + tmaxz) * 0.5;
      th[0] = (tmaxx - tminx) * 0.5;
      th[1] = (tmaxy - tminy) * 0.5;
      th[2] = (tmaxz - tminz) * 0.5;
      this.min[0] = tminx;
      this.min[1] = tminy;
      this.min[2] = tminz;
      this.max[0] = tmaxx;
      this.max[1] = tmaxy;
      this.max[2] = tmaxz;
    }
  }, {
    key: "intersects",
    value: function intersects(aabb) {
      var aMax = this.getMax();
      var aMin = this.getMin();
      var bMax = aabb.getMax();
      var bMin = aabb.getMin();
      return aMin[0] <= bMax[0] && aMax[0] >= bMin[0] && aMin[1] <= bMax[1] && aMax[1] >= bMin[1] && aMin[2] <= bMax[2] && aMax[2] >= bMin[2];
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      var min = this.getMin();
      var max = this.getMax();
      return !(point[0] < min[0] || point[0] > max[0] || point[1] < min[1] || point[1] > max[1] || point[2] < min[2] || point[2] > max[2]);
    }
    /**
     * get n-vertex
     * @param plane plane of CullingVolume
     */

  }, {
    key: "getNegativeFarPoint",
    value: function getNegativeFarPoint(plane) {
      if (plane.pnVertexFlag === 0x111) {
        return vec3.copy(vec3.create(), this.min);
      } else if (plane.pnVertexFlag === 0x110) {
        return vec3.fromValues(this.min[0], this.min[1], this.max[2]);
      } else if (plane.pnVertexFlag === 0x101) {
        return vec3.fromValues(this.min[0], this.max[1], this.min[2]);
      } else if (plane.pnVertexFlag === 0x100) {
        return vec3.fromValues(this.min[0], this.max[1], this.max[2]);
      } else if (plane.pnVertexFlag === 0x011) {
        return vec3.fromValues(this.max[0], this.min[1], this.min[2]);
      } else if (plane.pnVertexFlag === 0x010) {
        return vec3.fromValues(this.max[0], this.min[1], this.max[2]);
      } else if (plane.pnVertexFlag === 0x001) {
        return vec3.fromValues(this.max[0], this.max[1], this.min[2]);
      } else {
        return vec3.fromValues(this.max[0], this.max[1], this.max[2]);
      }
    }
    /**
     * get p-vertex
     * @param plane plane of CullingVolume
     */

  }, {
    key: "getPositiveFarPoint",
    value: function getPositiveFarPoint(plane) {
      if (plane.pnVertexFlag === 0x111) {
        return vec3.copy(vec3.create(), this.max);
      } else if (plane.pnVertexFlag === 0x110) {
        return vec3.fromValues(this.max[0], this.max[1], this.min[2]);
      } else if (plane.pnVertexFlag === 0x101) {
        return vec3.fromValues(this.max[0], this.min[1], this.max[2]);
      } else if (plane.pnVertexFlag === 0x100) {
        return vec3.fromValues(this.max[0], this.min[1], this.min[2]);
      } else if (plane.pnVertexFlag === 0x011) {
        return vec3.fromValues(this.min[0], this.max[1], this.max[2]);
      } else if (plane.pnVertexFlag === 0x010) {
        return vec3.fromValues(this.min[0], this.max[1], this.min[2]);
      } else if (plane.pnVertexFlag === 0x001) {
        return vec3.fromValues(this.min[0], this.min[1], this.max[2]);
      } else {
        return vec3.fromValues(this.min[0], this.min[1], this.min[2]);
      }
    }
  }]);

  return AABB;
}();
//# sourceMappingURL=AABB.js.map