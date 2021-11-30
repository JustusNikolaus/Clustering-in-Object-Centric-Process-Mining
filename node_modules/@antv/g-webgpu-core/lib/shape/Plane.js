"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glMatrix = require("gl-matrix");

var Plane = /*#__PURE__*/function () {
  /**
   * lookup table for p-vertex & n-vertex when doing frustum culling
   */
  function Plane(distance, normal) {
    (0, _classCallCheck2.default)(this, Plane);
    this.distance = void 0;
    this.normal = void 0;
    this.pnVertexFlag = void 0;
    this.distance = distance || 0;
    this.normal = normal || _glMatrix.vec3.fromValues(0, 1, 0);
    this.updatePNVertexFlag();
  }

  (0, _createClass2.default)(Plane, [{
    key: "updatePNVertexFlag",
    value: function updatePNVertexFlag() {
      this.pnVertexFlag = (Number(this.normal[0] >= 0) << 8) + (Number(this.normal[1] >= 0) << 4) + Number(this.normal[2] >= 0);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return _glMatrix.vec3.dot(point, this.normal) - this.distance;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var invLen = 1 / _glMatrix.vec3.len(this.normal);

      _glMatrix.vec3.scale(this.normal, this.normal, invLen);

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
        _glMatrix.vec3.lerp(point, start, end, t);
      }

      return intersects;
    }
  }]);
  return Plane;
}();

exports.Plane = Plane;
//# sourceMappingURL=Plane.js.map