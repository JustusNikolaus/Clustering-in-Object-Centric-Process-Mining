import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { vec3 } from 'gl-matrix';
var tmpVecA = vec3.create();
export var BoundingSphere = /*#__PURE__*/function () {
  function BoundingSphere(center, radius) {
    _classCallCheck(this, BoundingSphere);

    this.center = void 0;
    this.radius = void 0;
    this.center = center || vec3.create();
    this.radius = radius || 0.5;
  }

  _createClass(BoundingSphere, [{
    key: "containsPoint",
    value: function containsPoint(point) {
      vec3.sub(tmpVecA, point, this.center);
      return vec3.length(tmpVecA) < this.radius * this.radius;
    }
  }, {
    key: "intersects",
    value: function intersects(sphere) {
      vec3.sub(tmpVecA, sphere.center, this.center);
      var totalRadius = sphere.radius + this.radius;

      if (vec3.length(tmpVecA) <= totalRadius * totalRadius) {
        return true;
      }

      return false;
    }
  }]);

  return BoundingSphere;
}();
//# sourceMappingURL=BoundingSphere.js.map