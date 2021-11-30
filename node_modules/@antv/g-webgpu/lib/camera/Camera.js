"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = exports.CAMERA_PROJECTION_MODE = exports.CAMERA_TRACKING_MODE = exports.CAMERA_TYPE = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _glMatrix = require("gl-matrix");

var _inversify = require("inversify");

var _math = require("../utils/math");

var _Landmark = _interopRequireDefault(require("./Landmark"));

var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

var CAMERA_TYPE;
exports.CAMERA_TYPE = CAMERA_TYPE;

(function (CAMERA_TYPE) {
  CAMERA_TYPE["ORBITING"] = "ORBITING";
  CAMERA_TYPE["EXPLORING"] = "EXPLORING";
  CAMERA_TYPE["TRACKING"] = "TRACKING";
})(CAMERA_TYPE || (exports.CAMERA_TYPE = CAMERA_TYPE = {}));

var CAMERA_TRACKING_MODE;
exports.CAMERA_TRACKING_MODE = CAMERA_TRACKING_MODE;

(function (CAMERA_TRACKING_MODE) {
  CAMERA_TRACKING_MODE["DEFAULT"] = "DEFAULT";
  CAMERA_TRACKING_MODE["ROTATIONAL"] = "ROTATIONAL";
  CAMERA_TRACKING_MODE["TRANSLATIONAL"] = "TRANSLATIONAL";
  CAMERA_TRACKING_MODE["CINEMATIC"] = "CINEMATIC";
})(CAMERA_TRACKING_MODE || (exports.CAMERA_TRACKING_MODE = CAMERA_TRACKING_MODE = {}));

var CAMERA_PROJECTION_MODE;
exports.CAMERA_PROJECTION_MODE = CAMERA_PROJECTION_MODE;

(function (CAMERA_PROJECTION_MODE) {
  CAMERA_PROJECTION_MODE["ORTHOGRAPHIC"] = "ORTHOGRAPHIC";
  CAMERA_PROJECTION_MODE["PERSPECTIVE"] = "PERSPECTIVE";
})(CAMERA_PROJECTION_MODE || (exports.CAMERA_PROJECTION_MODE = CAMERA_PROJECTION_MODE = {}));

var DEG_2_RAD = Math.PI / 180;
var RAD_2_DEG = 180 / Math.PI;
/**
 * 参考「WebGL Insights - 23.Designing Cameras for WebGL Applications」，基于 Responsible Camera 思路设计
 * 保存相机参数，定义相机动作：
 * 1. dolly 沿 n 轴移动
 * 2. pan 沿 u v 轴移动
 * 3. rotate 以方位角旋转
 * 4. 移动到 Landmark，具有平滑的动画效果，其间禁止其他用户交互
 */

var Camera = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.InteractorService), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function Camera() {
    (0, _classCallCheck2.default)(this, Camera);
    this.matrix = _glMatrix.mat4.create();
    this.right = _glMatrix.vec3.fromValues(1, 0, 0);
    this.up = _glMatrix.vec3.fromValues(0, 1, 0);
    this.forward = _glMatrix.vec3.fromValues(0, 0, 1);
    this.position = _glMatrix.vec3.fromValues(0, 0, 1);
    this.focalPoint = _glMatrix.vec3.fromValues(0, 0, 0);
    this.distanceVector = _glMatrix.vec3.fromValues(0, 0, 0);
    this.distance = 1;
    this.azimuth = 0;
    this.elevation = 0;
    this.roll = 0;
    this.relAzimuth = 0;
    this.relElevation = 0;
    this.relRoll = 0;
    this.dollyingStep = 0;
    this.maxDistance = Infinity;
    this.minDistance = -Infinity;
    this.rotateWorld = false;
    (0, _initializerDefineProperty2.default)(this, "interactor", _descriptor, this);
    this.fov = 30;
    this.near = 0.1;
    this.far = 10000;
    this.aspect = 1;
    this.left = void 0;
    this.rright = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.zoom = 1;
    this.perspective = _glMatrix.mat4.create();
    this.view = void 0;
    this.following = undefined;
    this.type = CAMERA_TYPE.EXPLORING;
    this.trackingMode = CAMERA_TRACKING_MODE.DEFAULT;
    this.projectionMode = CAMERA_PROJECTION_MODE.PERSPECTIVE;
    this.frustum = new _gWebgpuCore.Frustum();
    this.landmarks = [];
    this.landmarkAnimationID = void 0;
  }

  (0, _createClass2.default)(Camera, [{
    key: "clone",
    value: function clone() {
      var camera = new Camera();
      camera.setType(this.type, undefined);
      camera.interactor = this.interactor;
      return camera;
    }
  }, {
    key: "getProjectionMode",
    value: function getProjectionMode() {
      return this.projectionMode;
    }
  }, {
    key: "getPerspective",
    value: function getPerspective() {
      return this.perspective;
    }
  }, {
    key: "getFrustum",
    value: function getFrustum() {
      return this.frustum;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: "setType",
    value: function setType(type, trackingMode) {
      this.type = type;

      if (this.type === CAMERA_TYPE.EXPLORING) {
        this.setWorldRotation(true);
      } else {
        this.setWorldRotation(false);
      }

      this._getAngles();

      if (this.type === CAMERA_TYPE.TRACKING && trackingMode !== undefined) {
        this.setTrackingMode(trackingMode);
      }

      return this;
    }
  }, {
    key: "setProjectionMode",
    value: function setProjectionMode(projectionMode) {
      this.projectionMode = projectionMode;
      return this;
    }
  }, {
    key: "setTrackingMode",
    value: function setTrackingMode(trackingMode) {
      if (this.type !== CAMERA_TYPE.TRACKING) {
        throw new Error('Impossible to set a tracking mode if the camera is not of tracking type');
      }

      this.trackingMode = trackingMode;
      return this;
    }
    /**
     * If flag is true, it reverses the azimuth and elevation angles.
     * Subsequent calls to rotate, setAzimuth, setElevation,
     * changeAzimuth or changeElevation will cause the inverted effect.
     * setRoll or changeRoll is not affected by this method.
     *
     * This inversion is useful when one wants to simulate that the world
     * is moving, instead of the camera.
     *
     * By default the camera angles are not reversed.
     * @param {Boolean} flag the boolean flag to reverse the angles.
     */

  }, {
    key: "setWorldRotation",
    value: function setWorldRotation(flag) {
      this.rotateWorld = flag;

      this._getAngles();
    }
    /**
     * 计算 MV 矩阵，为相机矩阵的逆矩阵
     */

  }, {
    key: "getViewTransform",
    value: function getViewTransform() {
      return _glMatrix.mat4.invert(_glMatrix.mat4.create(), this.matrix);
    }
  }, {
    key: "getWorldTransform",
    value: function getWorldTransform() {
      return this.matrix;
    }
    /**
     * 设置相机矩阵
     */

  }, {
    key: "setMatrix",
    value: function setMatrix(matrix) {
      this.matrix = matrix;

      this._update();

      return this;
    }
  }, {
    key: "setAspect",
    value: function setAspect(aspect) {
      this.setPerspective(this.near, this.far, this.fov, aspect);
      return this;
    }
    /**
     * Sets an offset in a larger frustum, used in PixelPicking
     */

  }, {
    key: "setViewOffset",
    value: function setViewOffset(fullWidth, fullHeight, x, y, width, height) {
      this.aspect = fullWidth / fullHeight;

      if (this.view === undefined) {
        this.view = {
          enabled: true,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        };
      }

      this.view.enabled = true;
      this.view.fullWidth = fullWidth;
      this.view.fullHeight = fullHeight;
      this.view.offsetX = x;
      this.view.offsetY = y;
      this.view.width = width;
      this.view.height = height;

      if (this.projectionMode === CAMERA_PROJECTION_MODE.PERSPECTIVE) {
        this.setPerspective(this.near, this.far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, this.far);
      }

      return this;
    }
  }, {
    key: "clearViewOffset",
    value: function clearViewOffset() {
      if (this.view !== undefined) {
        this.view.enabled = false;
      }

      if (this.projectionMode === CAMERA_PROJECTION_MODE.PERSPECTIVE) {
        this.setPerspective(this.near, this.far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, this.far);
      }

      return this;
    }
  }, {
    key: "setPerspective",
    value: function setPerspective(near, far, fov, aspect) {
      this.projectionMode = CAMERA_PROJECTION_MODE.PERSPECTIVE;
      this.fov = fov;
      this.near = near;
      this.far = far;
      this.aspect = aspect;

      _glMatrix.mat4.perspective(this.perspective, this.fov * DEG_2_RAD, this.aspect, this.near, this.far);

      return this;
    }
  }, {
    key: "setOrthographic",
    value: function setOrthographic(l, r, t, b, near, far) {
      this.projectionMode = CAMERA_PROJECTION_MODE.ORTHOGRAPHIC;
      this.rright = r;
      this.left = l;
      this.top = t;
      this.bottom = b;
      this.near = near;
      this.far = far;
      var dx = (this.rright - this.left) / (2 * this.zoom);
      var dy = (this.top - this.bottom) / (2 * this.zoom);
      var cx = (this.rright + this.left) / 2;
      var cy = (this.top + this.bottom) / 2;
      var left = cx - dx;
      var right = cx + dx;
      var top = cy + dy;
      var bottom = cy - dy;

      if (this.view !== undefined && this.view.enabled) {
        var scaleW = (this.rright - this.left) / this.view.fullWidth / this.zoom;
        var scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        left += scaleW * this.view.offsetX;
        right = left + scaleW * this.view.width;
        top -= scaleH * this.view.offsetY;
        bottom = top - scaleH * this.view.height;
      }

      _glMatrix.mat4.ortho(this.perspective, left, right, top, bottom, near, far);

      return this;
    }
    /**
     * 设置相机位置
     */

  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this._setPosition(x, y, z);

      this.setFocalPoint(this.focalPoint);
      return this;
    }
    /**
     * 设置视点位置
     */

  }, {
    key: "setFocalPoint",
    value: function setFocalPoint(x, y, z) {
      var up = _glMatrix.vec3.fromValues(0, 1, 0);

      this.focalPoint = (0, _math.createVec3)(x, y, z);

      if (this.trackingMode === CAMERA_TRACKING_MODE.CINEMATIC) {
        var d = _glMatrix.vec3.subtract(_glMatrix.vec3.create(), this.focalPoint, this.position);

        x = d[0];
        y = d[1];
        z = d[2];

        var r = _glMatrix.vec3.length(d);

        var el = Math.asin(y / r) * RAD_2_DEG;
        var az = 90 + Math.atan2(z, x) * RAD_2_DEG;

        var m = _glMatrix.mat4.create();

        _glMatrix.mat4.rotateY(m, m, az * DEG_2_RAD);

        _glMatrix.mat4.rotateX(m, m, el * DEG_2_RAD);

        up = _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), [0, 1, 0], m);
      }

      _glMatrix.mat4.invert(this.matrix, _glMatrix.mat4.lookAt(_glMatrix.mat4.create(), this.position, this.focalPoint, up));

      this._getAxes();

      this._getDistance();

      this._getAngles();

      return this;
    }
    /**
     * 固定当前视点，按指定距离放置相机
     */

  }, {
    key: "setDistance",
    value: function setDistance(d) {
      if (this.distance === d || d < 0) {
        return;
      }

      this.distance = d;

      if (this.distance < 0.0002) {
        this.distance = 0.0002;
      }

      this.dollyingStep = this.distance / 100;

      var pos = _glMatrix.vec3.create();

      d = this.distance;
      var n = this.forward;
      var f = this.focalPoint;
      pos[0] = d * n[0] + f[0];
      pos[1] = d * n[1] + f[1];
      pos[2] = d * n[2] + f[2];

      this._setPosition(pos);

      return this;
    }
  }, {
    key: "setMaxDistance",
    value: function setMaxDistance(d) {
      this.maxDistance = d;
      return this;
    }
  }, {
    key: "setMinDistance",
    value: function setMinDistance(d) {
      this.minDistance = d;
      return this;
    }
    /**
     * Changes the initial azimuth of the camera
     */

  }, {
    key: "changeAzimuth",
    value: function changeAzimuth(az) {
      this.setAzimuth(this.azimuth + az);
      return this;
    }
    /**
     * Changes the initial elevation of the camera
     */

  }, {
    key: "changeElevation",
    value: function changeElevation(el) {
      this.setElevation(this.elevation + el);
      return this;
    }
    /**
     * Changes the initial roll of the camera
     */

  }, {
    key: "changeRoll",
    value: function changeRoll(rl) {
      this.setRoll(this.roll + rl);
      return this;
    }
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} el the azimuth in degrees
     */

  }, {
    key: "setAzimuth",
    value: function setAzimuth(az) {
      this.azimuth = (0, _math.getAngle)(az);
      this.computeMatrix();

      this._getAxes();

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        this._getPosition();
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        this._getFocalPoint();
      }

      return this;
    }
  }, {
    key: "getAzimuth",
    value: function getAzimuth() {
      return this.azimuth;
    }
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} el the elevation in degrees
     */

  }, {
    key: "setElevation",
    value: function setElevation(el) {
      this.elevation = (0, _math.getAngle)(el);
      this.computeMatrix();

      this._getAxes();

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        this._getPosition();
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        this._getFocalPoint();
      }

      return this;
    }
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} angle the roll angle
     */

  }, {
    key: "setRoll",
    value: function setRoll(angle) {
      this.roll = (0, _math.getAngle)(angle);
      this.computeMatrix();

      this._getAxes();

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        this._getPosition();
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        this._getFocalPoint();
      }

      return this;
    }
    /**
     * Changes the azimuth and elevation with respect to the current camera axes
     * @param {Number} azimuth the relative azimuth
     * @param {Number} elevation the relative elevation
     * @param {Number} roll the relative roll
     */

  }, {
    key: "rotate",
    value: function rotate(azimuth, elevation, roll) {
      if (this.type === CAMERA_TYPE.EXPLORING) {
        azimuth = (0, _math.getAngle)(azimuth);
        elevation = (0, _math.getAngle)(elevation);
        roll = (0, _math.getAngle)(roll);

        var rotX = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [1, 0, 0], (this.rotateWorld ? 1 : -1) * elevation * DEG_2_RAD);

        var rotY = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [0, 1, 0], (this.rotateWorld ? 1 : -1) * azimuth * DEG_2_RAD);

        var rotZ = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [0, 0, 1], roll * DEG_2_RAD);

        var rotQ = _glMatrix.quat.multiply(_glMatrix.quat.create(), rotY, rotX);

        rotQ = _glMatrix.quat.multiply(_glMatrix.quat.create(), rotQ, rotZ);

        var rotMatrix = _glMatrix.mat4.fromQuat(_glMatrix.mat4.create(), rotQ);

        _glMatrix.mat4.translate(this.matrix, this.matrix, [0, 0, -this.distance]);

        _glMatrix.mat4.multiply(this.matrix, this.matrix, rotMatrix);

        _glMatrix.mat4.translate(this.matrix, this.matrix, [0, 0, this.distance]);
      } else {
        if (Math.abs(this.elevation + elevation) > 90) {
          return;
        }

        this.relElevation = (0, _math.getAngle)(elevation);
        this.relAzimuth = (0, _math.getAngle)(azimuth);
        this.relRoll = (0, _math.getAngle)(roll);
        this.elevation += this.relElevation;
        this.azimuth += this.relAzimuth;
        this.roll += this.relRoll;
        this.computeMatrix();
      }

      this._getAxes();

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        this._getPosition();
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        this._getFocalPoint();
      }

      this._update();

      return this;
    }
    /**
     * 沿水平(right) & 垂直(up)平移相机
     */

  }, {
    key: "pan",
    value: function pan(tx, ty) {
      var coords = (0, _math.createVec3)(tx, ty, 0);

      var pos = _glMatrix.vec3.clone(this.position);

      _glMatrix.vec3.add(pos, pos, _glMatrix.vec3.scale(_glMatrix.vec3.create(), this.right, coords[0]));

      _glMatrix.vec3.add(pos, pos, _glMatrix.vec3.scale(_glMatrix.vec3.create(), this.up, coords[1]));

      this._setPosition(pos);

      return this;
    }
    /**
     * 沿 n 轴移动，当距离视点远时移动速度较快，离视点越近速度越慢
     */

  }, {
    key: "dolly",
    value: function dolly(value) {
      var n = this.forward;

      var pos = _glMatrix.vec3.clone(this.position);

      var step = value * this.dollyingStep;
      var updatedDistance = this.distance + value * this.dollyingStep; // 限制视点距离范围

      step = Math.max(Math.min(updatedDistance, this.maxDistance), this.minDistance) - this.distance;
      pos[0] += step * n[0];
      pos[1] += step * n[1];
      pos[2] += step * n[2];

      this._setPosition(pos);

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        // 重新计算视点距离
        this._getDistance();
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        // 保持视距，移动视点位置
        _glMatrix.vec3.add(this.focalPoint, pos, this.distanceVector);
      }

      return this;
    }
  }, {
    key: "createLandmark",
    value: function createLandmark(name, params) {
      var camera = this.clone();
      camera.setPosition(params.position);
      camera.setFocalPoint(params.focalPoint);

      if (params.roll !== undefined) {
        camera.setRoll(params.roll);
      }

      var landmark = new _Landmark.default(name, camera);
      this.landmarks.push(landmark);
      return landmark;
    }
  }, {
    key: "setLandmark",
    value: function setLandmark(name) {
      var landmark = new _Landmark.default(name, this);
      this.landmarks.push(landmark);
      return this;
    }
  }, {
    key: "gotoLandmark",
    value: function gotoLandmark(name) {
      var _this = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var landmark = this.landmarks.find(function (l) {
        return l.name === name;
      });

      if (landmark) {
        if (duration === 0) {
          landmark.retrieve(this);
          return;
        }

        if (this.landmarkAnimationID !== undefined) {
          window.cancelAnimationFrame(this.landmarkAnimationID);
        } // TODO: do not process events during animation


        this.interactor.disconnect();
        var destPosition = landmark.getPosition();
        var destFocalPoint = landmark.getFocalPoint();
        var destRoll = landmark.getRoll();
        var timeStart;

        var animate = function animate(timestamp) {
          if (timeStart === undefined) {
            timeStart = timestamp;
          }

          var elapsed = timestamp - timeStart; // TODO: use better ease function

          var t = (1 - Math.cos(elapsed / duration * Math.PI)) / 2;

          var interFocalPoint = _glMatrix.vec3.create();

          var interPosition = _glMatrix.vec3.create();

          var interRoll = 0;

          _glMatrix.vec3.lerp(interFocalPoint, _this.focalPoint, destFocalPoint, t);

          _glMatrix.vec3.lerp(interPosition, _this.position, destPosition, t);

          interRoll = _this.roll * (1 - t) + destRoll * t;

          _this.setFocalPoint(interFocalPoint);

          _this.setPosition(interPosition);

          _this.setRoll(interRoll);

          _this.computeMatrix();

          var dist = _glMatrix.vec3.dist(interFocalPoint, destFocalPoint) + _glMatrix.vec3.dist(interPosition, destPosition);

          if (dist > 0.01) {//
          } else {
            _this.setFocalPoint(interFocalPoint);

            _this.setPosition(interPosition);

            _this.setRoll(interRoll);

            _this.computeMatrix();

            _this.interactor.connect();

            return;
          }

          if (elapsed < duration) {
            _this.landmarkAnimationID = window.requestAnimationFrame(animate);
          }
        };

        window.requestAnimationFrame(animate);
      }
    }
    /**
     * 根据相机矩阵重新计算各种相机参数
     */

  }, {
    key: "_update",
    value: function _update() {
      this._getAxes();

      this._getPosition();

      this._getDistance();

      this._getAngles();
    }
    /**
     * 计算相机矩阵
     */

  }, {
    key: "computeMatrix",
    value: function computeMatrix() {
      var rotX;
      var rotY; // 使用四元数描述 3D 旋转
      // @see https://xiaoiver.github.io/coding/2018/12/28/Camera-%E8%AE%BE%E8%AE%A1-%E4%B8%80.html

      var rotZ = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [0, 0, 1], this.roll * DEG_2_RAD);

      _glMatrix.mat4.identity(this.matrix); // only consider HCS for EXPLORING and ORBITING cameras


      rotX = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [1, 0, 0], (this.rotateWorld && this.type !== CAMERA_TYPE.TRACKING || this.type === CAMERA_TYPE.TRACKING ? 1 : -1) * this.elevation * DEG_2_RAD);
      rotY = _glMatrix.quat.setAxisAngle(_glMatrix.quat.create(), [0, 1, 0], (this.rotateWorld && this.type !== CAMERA_TYPE.TRACKING || this.type === CAMERA_TYPE.TRACKING ? 1 : -1) * this.azimuth * DEG_2_RAD);

      var rotQ = _glMatrix.quat.multiply(_glMatrix.quat.create(), rotY, rotX);

      rotQ = _glMatrix.quat.multiply(_glMatrix.quat.create(), rotQ, rotZ);

      var rotMatrix = _glMatrix.mat4.fromQuat(_glMatrix.mat4.create(), rotQ);

      if (this.type === CAMERA_TYPE.ORBITING || this.type === CAMERA_TYPE.EXPLORING) {
        _glMatrix.mat4.translate(this.matrix, this.matrix, this.focalPoint);

        _glMatrix.mat4.multiply(this.matrix, this.matrix, rotMatrix);

        _glMatrix.mat4.translate(this.matrix, this.matrix, [0, 0, this.distance]);
      } else if (this.type === CAMERA_TYPE.TRACKING) {
        _glMatrix.mat4.translate(this.matrix, this.matrix, this.position);

        _glMatrix.mat4.multiply(this.matrix, this.matrix, rotMatrix);
      }
    }
    /**
     * Sets the camera position in the camera matrix
     */

  }, {
    key: "_setPosition",
    value: function _setPosition(x, y, z) {
      this.position = (0, _math.createVec3)(x, y, z);
      var m = this.matrix;
      m[12] = this.position[0];
      m[13] = this.position[1];
      m[14] = this.position[2];
      m[15] = 1;
    }
    /**
     * Recalculates axes based on the current matrix
     */

  }, {
    key: "_getAxes",
    value: function _getAxes() {
      _glMatrix.vec3.copy(this.right, (0, _math.createVec3)(_glMatrix.vec4.transformMat4(_glMatrix.vec4.create(), [1, 0, 0, 0], this.matrix)));

      _glMatrix.vec3.copy(this.up, (0, _math.createVec3)(_glMatrix.vec4.transformMat4(_glMatrix.vec4.create(), [0, 1, 0, 0], this.matrix)));

      _glMatrix.vec3.copy(this.forward, (0, _math.createVec3)(_glMatrix.vec4.transformMat4(_glMatrix.vec4.create(), [0, 0, 1, 0], this.matrix)));

      _glMatrix.vec3.normalize(this.right, this.right);

      _glMatrix.vec3.normalize(this.up, this.up);

      _glMatrix.vec3.normalize(this.forward, this.forward);
    }
    /**
     * Recalculates euler angles based on the current state
     */

  }, {
    key: "_getAngles",
    value: function _getAngles() {
      // Recalculates angles
      var x = this.distanceVector[0];
      var y = this.distanceVector[1];
      var z = this.distanceVector[2];

      var r = _glMatrix.vec3.length(this.distanceVector); // FAST FAIL: If there is no distance we cannot compute angles


      if (r === 0) {
        this.elevation = 0;
        this.azimuth = 0;
        return;
      }

      if (this.type === CAMERA_TYPE.TRACKING) {
        this.elevation = Math.asin(y / r) * RAD_2_DEG;
        this.azimuth = Math.atan2(-x, -z) * RAD_2_DEG;
      } else {
        if (this.rotateWorld) {
          this.elevation = Math.asin(y / r) * RAD_2_DEG;
          this.azimuth = Math.atan2(-x, -z) * RAD_2_DEG;
        } else {
          this.elevation = -Math.asin(y / r) * RAD_2_DEG;
          this.azimuth = -Math.atan2(-x, -z) * RAD_2_DEG;
        }
      }
    }
    /**
     * 重新计算相机位置，只有 ORBITING 模式相机位置才会发生变化
     */

  }, {
    key: "_getPosition",
    value: function _getPosition() {
      _glMatrix.vec3.copy(this.position, (0, _math.createVec3)(_glMatrix.vec4.transformMat4(_glMatrix.vec4.create(), [0, 0, 0, 1], this.matrix))); // 相机位置变化，需要重新计算视距


      this._getDistance();
    }
    /**
     * 重新计算视点，只有 TRACKING 模式视点才会发生变化
     */

  }, {
    key: "_getFocalPoint",
    value: function _getFocalPoint() {
      _glMatrix.vec3.transformMat3(this.distanceVector, [0, 0, -this.distance], _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), this.matrix));

      _glMatrix.vec3.add(this.focalPoint, this.position, this.distanceVector); // 视点变化，需要重新计算视距


      this._getDistance();
    }
    /**
     * 重新计算视距
     */

  }, {
    key: "_getDistance",
    value: function _getDistance() {
      this.distanceVector = _glMatrix.vec3.subtract(_glMatrix.vec3.create(), this.focalPoint, this.position);
      this.distance = _glMatrix.vec3.length(this.distanceVector);
      this.dollyingStep = this.distance / 100;
    }
  }]);
  return Camera;
}(), _class3.ProjectionMode = {
  ORTHOGRAPHIC: 'ORTHOGRAPHIC',
  PERSPECTIVE: 'PERSPECTIVE'
}, _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "interactor", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map