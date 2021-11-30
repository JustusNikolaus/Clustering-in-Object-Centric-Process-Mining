import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { mat4, vec3 } from 'gl-matrix';

/**
 * 保存相机状态，便于后续在多个 Landmark 间移动
 */
var Landmark = /*#__PURE__*/function () {
  function Landmark(name, c) {
    _classCallCheck(this, Landmark);

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
    this.matrix = mat4.clone(c.matrix);
    this.right = vec3.clone(c.right);
    this.up = vec3.clone(c.up);
    this.forward = vec3.clone(c.forward);
    this.position = vec3.clone(c.position);
    this.focalPoint = vec3.clone(c.focalPoint);
    this.distanceVector = vec3.clone(c.distanceVector);
    this.azimuth = c.azimuth;
    this.elevation = c.elevation;
    this.roll = c.roll;
    this.relAzimuth = c.relAzimuth;
    this.relElevation = c.relElevation;
    this.relRoll = c.relRoll;
    this.dollyingStep = c.dollyingStep;
    this.distance = c.distance;
  }

  _createClass(Landmark, [{
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
      c.matrix = mat4.copy(c.matrix, this.matrix);
      c.right = vec3.copy(c.right, this.right);
      c.up = vec3.copy(c.up, this.up);
      c.forward = vec3.copy(c.forward, this.forward);
      c.position = vec3.copy(c.position, this.position);
      c.focalPoint = vec3.copy(c.focalPoint, this.focalPoint);
      c.distanceVector = vec3.copy(c.distanceVector, this.distanceVector);
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

export { Landmark as default };
//# sourceMappingURL=Landmark.js.map