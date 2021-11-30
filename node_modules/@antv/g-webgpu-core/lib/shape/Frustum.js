"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frustum = exports.Mask = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glMatrix = require("gl-matrix");

var _Plane = require("./Plane");

var Mask;
exports.Mask = Mask;

(function (Mask) {
  Mask[Mask["OUTSIDE"] = 4294967295] = "OUTSIDE";
  Mask[Mask["INSIDE"] = 0] = "INSIDE";
  Mask[Mask["INDETERMINATE"] = 2147483647] = "INDETERMINATE";
})(Mask || (exports.Mask = Mask = {}));

var Frustum = /*#__PURE__*/function () {
  function Frustum(planes) {
    (0, _classCallCheck2.default)(this, Frustum);
    this.planes = [];

    if (planes) {
      this.planes = planes;
    } else {
      for (var i = 0; i < 6; i++) {
        this.planes.push(new _Plane.Plane());
      }
    }
  }
  /**
   * extract 6 planes from vpMatrix
   * @see http://www8.cs.umu.se/kurser/5DV051/HT12/lab/plane_extraction.pdf
   * @param vpMatrix viewProjectionMatrix
   */


  (0, _createClass2.default)(Frustum, [{
    key: "extractFromVPMatrix",
    value: function extractFromVPMatrix(vpMatrix) {
      var _vpMatrix = (0, _slicedToArray2.default)(vpMatrix, 16),
          m0 = _vpMatrix[0],
          m1 = _vpMatrix[1],
          m2 = _vpMatrix[2],
          m3 = _vpMatrix[3],
          m4 = _vpMatrix[4],
          m5 = _vpMatrix[5],
          m6 = _vpMatrix[6],
          m7 = _vpMatrix[7],
          m8 = _vpMatrix[8],
          m9 = _vpMatrix[9],
          m10 = _vpMatrix[10],
          m11 = _vpMatrix[11],
          m12 = _vpMatrix[12],
          m13 = _vpMatrix[13],
          m14 = _vpMatrix[14],
          m15 = _vpMatrix[15]; // right


      _glMatrix.vec3.set(this.planes[0].normal, m3 - m0, m7 - m4, m11 - m8);

      this.planes[0].distance = -(m15 - m12); // left

      _glMatrix.vec3.set(this.planes[1].normal, m3 + m0, m7 + m4, m11 + m8);

      this.planes[1].distance = -(m15 + m12); // bottom

      _glMatrix.vec3.set(this.planes[2].normal, m3 + m1, m7 + m5, m11 + m9);

      this.planes[2].distance = -(m15 + m13); // top

      _glMatrix.vec3.set(this.planes[3].normal, m3 - m1, m7 - m5, m11 - m9);

      this.planes[3].distance = -(m15 - m13); // far

      _glMatrix.vec3.set(this.planes[4].normal, m3 - m2, m7 - m6, m11 - m10);

      this.planes[4].distance = -(m15 - m14); // near

      _glMatrix.vec3.set(this.planes[5].normal, m3 + m2, m7 + m6, m11 + m10);

      this.planes[5].distance = -(m15 + m14);
      this.planes.forEach(function (plane) {
        plane.normalize();
        plane.updatePNVertexFlag();
      });
    }
  }]);
  return Frustum;
}();

exports.Frustum = Frustum;
//# sourceMappingURL=Frustum.js.map