"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundingSphere = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glMatrix = require("gl-matrix");

var tmpVecA = _glMatrix.vec3.create();

var BoundingSphere = /*#__PURE__*/function () {
  function BoundingSphere(center, radius) {
    (0, _classCallCheck2.default)(this, BoundingSphere);
    this.center = void 0;
    this.radius = void 0;
    this.center = center || _glMatrix.vec3.create();
    this.radius = radius || 0.5;
  }

  (0, _createClass2.default)(BoundingSphere, [{
    key: "containsPoint",
    value: function containsPoint(point) {
      _glMatrix.vec3.sub(tmpVecA, point, this.center);

      return _glMatrix.vec3.length(tmpVecA) < this.radius * this.radius;
    }
  }, {
    key: "intersects",
    value: function intersects(sphere) {
      _glMatrix.vec3.sub(tmpVecA, sphere.center, this.center);

      var totalRadius = sphere.radius + this.radius;

      if (_glMatrix.vec3.length(tmpVecA) <= totalRadius * totalRadius) {
        return true;
      }

      return false;
    }
  }]);
  return BoundingSphere;
}();

exports.BoundingSphere = BoundingSphere;
//# sourceMappingURL=BoundingSphere.js.map