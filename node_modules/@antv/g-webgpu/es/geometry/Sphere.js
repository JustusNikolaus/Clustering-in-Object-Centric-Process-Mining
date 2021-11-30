import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { generateAABBFromVertices } from '@antv/g-webgpu-core';
import { injectable } from 'inversify';
import { Geometry } from '.';
export var
/**
 * borrow from playcanvas
 */
Sphere = (_dec = injectable(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  _inherits(Sphere, _Geometry);

  var _super = _createSuper(Sphere);

  function Sphere() {
    _classCallCheck(this, Sphere);

    return _super.apply(this, arguments);
  }

  _createClass(Sphere, [{
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


      var aabb = generateAABBFromVertices(positions);
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
}(Geometry)) || _class);
//# sourceMappingURL=Sphere.js.map