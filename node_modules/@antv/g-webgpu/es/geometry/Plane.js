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
Plane = (_dec = injectable(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  _inherits(Plane, _Geometry);

  var _super = _createSuper(Plane);

  function Plane() {
    _classCallCheck(this, Plane);

    return _super.apply(this, arguments);
  }

  _createClass(Plane, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this$config = this.config,
          _this$config$halfExte = _this$config.halfExtents,
          halfExtents = _this$config$halfExte === void 0 ? [0.5, 0.5] : _this$config$halfExte,
          _this$config$widthSeg = _this$config.widthSegments,
          widthSegments = _this$config$widthSeg === void 0 ? 5 : _this$config$widthSeg,
          _this$config$lengthSe = _this$config.lengthSegments,
          lengthSegments = _this$config$lengthSe === void 0 ? 5 : _this$config$lengthSe;
      var positions = [];
      var normals = [];
      var uvs = [];
      var indices = [];
      var vcounter = 0;

      for (var i = 0; i <= widthSegments; i++) {
        for (var j = 0; j <= lengthSegments; j++) {
          var x = -halfExtents[0] + 2.0 * halfExtents[0] * i / widthSegments;
          var y = 0.0;
          var z = -(-halfExtents[1] + 2.0 * halfExtents[1] * j / lengthSegments);
          var u = i / widthSegments;
          var v = j / lengthSegments;
          positions.push(x, y, z);
          normals.push(0.0, 1.0, 0.0);
          uvs.push(u, v);

          if (i < widthSegments && j < lengthSegments) {
            indices.push(vcounter + lengthSegments + 1, vcounter + 1, vcounter);
            indices.push(vcounter + lengthSegments + 1, vcounter + lengthSegments + 2, vcounter + 1);
          }

          vcounter++;
        }
      } // generate AABB


      var aabb = generateAABBFromVertices(positions);
      var component = this.getComponent();
      component.indices = Uint32Array.from(indices);
      component.aabb = aabb;
      component.vertexCount = vcounter;
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

  return Plane;
}(Geometry)) || _class);
//# sourceMappingURL=Plane.js.map