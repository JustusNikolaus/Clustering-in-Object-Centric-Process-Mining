"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _ = require(".");

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var
/**
 * borrow from playcanvas
 */
Sphere = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Sphere, _Geometry);

  var _super = _createSuper(Sphere);

  function Sphere() {
    (0, _classCallCheck2.default)(this, Sphere);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Sphere, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this$config = this.config,
          _this$config$radius = _this$config.radius,
          radius = _this$config$radius === void 0 ? 0.5 : _this$config$radius,
          _this$config$latitude = _this$config.latitudeBands,
          latitudeBands = _this$config$latitude === void 0 ? 16 : _this$config$latitude,
          _this$config$longitud = _this$config.longitudeBands,
          longitudeBands = _this$config$longitud === void 0 ? 16 : _this$config$longitud;
      var positions = [];
      var normals = [];
      var uvs = [];
      var indices = [];

      for (var lat = 0; lat <= latitudeBands; lat++) {
        var theta = lat * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var lon = 0; lon <= longitudeBands; lon++) {
          // Sweep the sphere from the positive Z axis to match a 3DS Max sphere
          var phi = lon * 2 * Math.PI / longitudeBands - Math.PI / 2.0;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);
          var x = cosPhi * sinTheta;
          var y = cosTheta;
          var z = sinPhi * sinTheta;
          var u = 1.0 - lon / longitudeBands;
          var v = 1.0 - lat / latitudeBands;
          positions.push(x * radius, y * radius, z * radius);
          normals.push(x, y, z);
          uvs.push(u, v);
        }
      }

      for (var _lat = 0; _lat < latitudeBands; ++_lat) {
        for (var _lon = 0; _lon < longitudeBands; ++_lon) {
          var first = _lat * (longitudeBands + 1) + _lon;
          var second = first + longitudeBands + 1;
          indices.push(first + 1, second, first);
          indices.push(first + 1, second + 1, second);
        }
      } // generate AABB


      var aabb = (0, _gWebgpuCore.generateAABBFromVertices)(positions);
      var component = this.getComponent();
      component.indices = Uint32Array.from(indices);
      component.aabb = aabb;
      component.vertexCount = positions.length / 3;
      component.attributes = [{
        dirty: true,
        name: 'position',
        data: Float32Array.from(positions),
        arrayStride: 4 * 3,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 0,
          offset: 0,
          format: 'float3'
        }]
      }, {
        dirty: true,
        name: 'normal',
        data: Float32Array.from(normals),
        arrayStride: 4 * 3,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 1,
          offset: 0,
          format: 'float3'
        }]
      }, {
        dirty: true,
        name: 'uv',
        data: Float32Array.from(uvs),
        arrayStride: 4 * 2,
        stepMode: 'vertex',
        attributes: [{
          shaderLocation: 2,
          offset: 0,
          format: 'float2'
        }]
      }]; // TODO: barycentric & tangent
    }
  }]);
  return Sphere;
}(_.Geometry)) || _class);
exports.Sphere = Sphere;
//# sourceMappingURL=Sphere.js.map