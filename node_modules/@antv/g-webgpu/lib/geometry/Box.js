"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _glMatrix = require("gl-matrix");

var _inversify = require("inversify");

var _ = require(".");

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var primitiveUv1Padding = 4.0 / 64;
var primitiveUv1PaddingScale = 1.0 - primitiveUv1Padding * 2;
var
/**
 * borrow from playcanvas:
 * Creates a procedural box-shaped mesh
 */
Box = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Box, _Geometry);

  var _super = _createSuper(Box);

  function Box() {
    (0, _classCallCheck2.default)(this, Box);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Box, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this$config = this.config,
          _this$config$widthSeg = _this$config.widthSegments,
          widthSegments = _this$config$widthSeg === void 0 ? 1 : _this$config$widthSeg,
          _this$config$heightSe = _this$config.heightSegments,
          heightSegments = _this$config$heightSe === void 0 ? 1 : _this$config$heightSe,
          _this$config$depthSeg = _this$config.depthSegments,
          depthSegments = _this$config$depthSeg === void 0 ? 1 : _this$config$depthSeg,
          _this$config$halfExte = _this$config.halfExtents,
          halfExtents = _this$config$halfExte === void 0 ? _glMatrix.vec3.fromValues(0.5, 0.5, 0.5) : _this$config$halfExte;
      var ws = widthSegments;
      var hs = heightSegments;
      var ds = depthSegments;

      var _halfExtents = (0, _slicedToArray2.default)(halfExtents, 3),
          hex = _halfExtents[0],
          hey = _halfExtents[1],
          hez = _halfExtents[2];

      var corners = [_glMatrix.vec3.fromValues(-hex, -hey, hez), _glMatrix.vec3.fromValues(hex, -hey, hez), _glMatrix.vec3.fromValues(hex, hey, hez), _glMatrix.vec3.fromValues(-hex, hey, hez), _glMatrix.vec3.fromValues(hex, -hey, -hez), _glMatrix.vec3.fromValues(-hex, -hey, -hez), _glMatrix.vec3.fromValues(-hex, hey, -hez), _glMatrix.vec3.fromValues(hex, hey, -hez)];
      var faceAxes = [[0, 1, 3], // FRONT
      [4, 5, 7], // BACK
      [3, 2, 6], // TOP
      [1, 0, 4], // BOTTOM
      [1, 4, 2], // RIGHT
      [5, 0, 6] // LEFT
      ];
      var faceNormals = [[0, 0, 1], // FRONT
      [0, 0, -1], // BACK
      [0, 1, 0], // TOP
      [0, -1, 0], // BOTTOM
      [1, 0, 0], // RIGHT
      [-1, 0, 0] // LEFT
      ];
      var sides = {
        FRONT: 0,
        BACK: 1,
        TOP: 2,
        BOTTOM: 3,
        RIGHT: 4,
        LEFT: 5
      };
      var positions = [];
      var normals = [];
      var uvs = [];
      var uvs1 = [];
      var indices = [];
      var vcounter = 0;

      var generateFace = function generateFace(side, uSegments, vSegments) {
        var u;
        var v;
        var i;
        var j;

        for (i = 0; i <= uSegments; i++) {
          for (j = 0; j <= vSegments; j++) {
            var temp1 = _glMatrix.vec3.create();

            var temp2 = _glMatrix.vec3.create();

            var temp3 = _glMatrix.vec3.create();

            var r = _glMatrix.vec3.create();

            _glMatrix.vec3.lerp(temp1, corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);

            _glMatrix.vec3.lerp(temp2, corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);

            _glMatrix.vec3.sub(temp3, temp2, corners[faceAxes[side][0]]);

            _glMatrix.vec3.add(r, temp1, temp3);

            u = i / uSegments;
            v = j / vSegments;
            positions.push(r[0], r[1], r[2]);
            normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
            uvs.push(u, v); // pack as 3x2
            // 1/3 will be empty, but it's either that or stretched pixels
            // TODO: generate non-rectangular lightMaps, so we could use space without stretching

            u /= 3;
            v /= 3;
            u = u * primitiveUv1PaddingScale + primitiveUv1Padding;
            v = v * primitiveUv1PaddingScale + primitiveUv1Padding;
            u += side % 3 / 3;
            v += Math.floor(side / 3) / 3;
            uvs1.push(u, v);

            if (i < uSegments && j < vSegments) {
              indices.push(vcounter + vSegments + 1, vcounter + 1, vcounter);
              indices.push(vcounter + vSegments + 1, vcounter + vSegments + 2, vcounter + 1);
            }

            vcounter++;
          }
        }
      };

      generateFace(sides.FRONT, ws, hs);
      generateFace(sides.BACK, ws, hs);
      generateFace(sides.TOP, ws, ds);
      generateFace(sides.BOTTOM, ws, ds);
      generateFace(sides.RIGHT, ds, hs);
      generateFace(sides.LEFT, ds, hs); // generate AABB

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
  return Box;
}(_.Geometry)) || _class);
exports.Box = Box;
//# sourceMappingURL=Box.js.map