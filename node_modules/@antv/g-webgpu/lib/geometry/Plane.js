"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

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
Plane = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Plane, _Geometry);

  var _super = _createSuper(Plane);

  function Plane() {
    (0, _classCallCheck2.default)(this, Plane);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Plane, [{
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


      var aabb = (0, _gWebgpuCore.generateAABBFromVertices)(positions);
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
}(_.Geometry)) || _class);
exports.Plane = Plane;
//# sourceMappingURL=Plane.js.map