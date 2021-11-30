import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { vec3 } from 'gl-matrix';
export var Plane = /*#__PURE__*/function () {
  /**
   * lookup table for p-vertex & n-vertex when doing frustum culling
   */
  function Plane(distance, normal) {
    _classCallCheck(this, Plane);

    this.distance = void 0;
    this.normal = void 0;
    this.pnVertexFlag = void 0;
    this.distance = distance || 0;
    this.normal = normal || vec3.fromValues(0, 1, 0);
    this.updatePNVertexFlag();
  }

  _createClass(Plane, [{
    key: "updatePNVertexFlag",
    value: function updatePNVertexFlag() {
      this.pnVertexFlag = (Number(this.normal[0] >= 0) << 8) + (Number(this.normal[1] >= 0) << 4) + Number(this.normal[2] >= 0);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return vec3.dot(point, this.normal) - this.distance;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var invLen = 1 / vec3.len(this.normal);
      vec3.scale(this.normal, this.normal, invLen);
      this.distance *= invLen;
    }
  }, {
    key: "intersectsLine",
    value: function intersectsLine(start, end, point) {
      var d0 = this.distanceToPoint(start);
      var d1 = this.distanceToPoint(end);
      var t = d0 / (d0 - d1);
      var intersects = t >= 0 && t <= 1;

      if (intersects && point) {
        vec3.lerp(point, start, end, t);
      }

      return intersects;
    }
  }]);

  return Plane;
}();
//# sourceMappingURL=Plane.js.map