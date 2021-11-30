"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _glMatrix = require("gl-matrix");

/**
 * 保存相机状态，便于后续在多个 Landmark 间移动
 */
var Landmark = /*#__PURE__*/function () {
  function Landmark(name, c) {
    (0, _classCallCheck2.default)(this, Landmark);
    this.name = void 0;
    this.matrix = void 0;
    this.right = void 0;
    this.up = void 0;
    this.forward = void 0;
    this.position = void 0;
    this.focalPoint = void 0;
    this.distanceVector = void 0;
    this.distance = void 0;
    this.dollyingStep = void 0;
    this.azimuth = 0;
    this.elevation = 0;
    this.roll = 0;
    this.relAzimuth = 0;
    this.relElevation = 0;
    this.relRoll = 0;
    this.name = name;
    this.matrix = _glMatrix.mat4.clone(c.matrix);
    this.right = _glMatrix.vec3.clone(c.right);
    this.up = _glMatrix.vec3.clone(c.up);
    this.forward = _glMatrix.vec3.clone(c.forward);
    this.position = _glMatrix.vec3.clone(c.position);
    this.focalPoint = _glMatrix.vec3.clone(c.focalPoint);
    this.distanceVector = _glMatrix.vec3.clone(c.distanceVector);
    this.azimuth = c.azimuth;
    this.elevation = c.elevation;
    this.roll = c.roll;
    this.relAzimuth = c.relAzimuth;
    this.relElevation = c.relElevation;
    this.relRoll = c.relRoll;
    this.dollyingStep = c.dollyingStep;
    this.distance = c.distance;
  }

  (0, _createClass2.default)(Landmark, [{
    key: "getPosition",
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: "getFocalPoint",
    value: function getFocalPoint() {
      return this.focalPoint;
    }
  }, {
    key: "getRoll",
    value: function getRoll() {
      return this.roll;
    }
  }, {
    key: "retrieve",
    value: function retrieve(c) {
      c.matrix = _glMatrix.mat4.copy(c.matrix, this.matrix);
      c.right = _glMatrix.vec3.copy(c.right, this.right);
      c.up = _glMatrix.vec3.copy(c.up, this.up);
      c.forward = _glMatrix.vec3.copy(c.forward, this.forward);
      c.position = _glMatrix.vec3.copy(c.position, this.position);
      c.focalPoint = _glMatrix.vec3.copy(c.focalPoint, this.focalPoint);
      c.distanceVector = _glMatrix.vec3.copy(c.distanceVector, this.distanceVector);
      c.azimuth = this.azimuth;
      c.elevation = this.elevation;
      c.roll = this.roll;
      c.relAzimuth = this.relAzimuth;
      c.relElevation = this.relElevation;
      c.relRoll = this.relRoll;
      c.dollyingStep = this.dollyingStep;
      c.distance = this.distance;
    }
  }]);
  return Landmark;
}();

exports.default = Landmark;
//# sourceMappingURL=Landmark.js.map