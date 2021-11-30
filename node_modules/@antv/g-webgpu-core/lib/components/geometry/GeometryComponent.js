"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometryComponent = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _glMatrix = require("gl-matrix");

var _ComponentManager = require("../../ComponentManager");

var _isTypedarray = require("../../utils/is-typedarray");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GeometryComponent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(GeometryComponent, _Component);

  var _super = _createSuper(GeometryComponent);

  // instanced count
  function GeometryComponent(data) {
    var _this;

    (0, _classCallCheck2.default)(this, GeometryComponent);
    _this = _super.call(this, data);
    _this.dirty = true;
    _this.attributes = [];
    _this.indices = void 0;
    _this.indicesBuffer = void 0;
    _this.vertexCount = 0;
    _this.maxInstancedCount = void 0;
    _this.aabb = void 0;
    _this.entity = void 0;
    Object.assign((0, _assertThisInitialized2.default)(_this), data);
    return _this;
  }
  /**
   * @see https://threejs.org/docs/#api/en/core/BufferAttribute
   */


  (0, _createClass2.default)(GeometryComponent, [{
    key: "setAttribute",
    value: function setAttribute(name, data, descriptor, bufferGetter) {
      var existed = this.attributes.find(function (a) {
        return a.name === name;
      });

      if (!existed) {
        this.attributes.push(_objectSpread(_objectSpread({
          dirty: true,
          name: name,
          data: data
        }, descriptor), {}, {
          bufferGetter: bufferGetter
        }));
      } else {
        existed.data = data;
        existed.dirty = true;
      }

      this.dirty = true;
      return this;
    }
  }, {
    key: "setIndex",
    value: function setIndex(data) {
      this.indices = new Uint32Array( // @ts-ignore
      data.buffer ? data.buffer : data);
      this.dirty = true;
      return this;
    }
    /**
     * when merge all the geometries into one, we need to transform every vertex's position
     * and every face's normal
     */

  }, {
    key: "applyMatrix",
    value: function applyMatrix(matrix) {
      var positionAttribute = this.attributes.find(function (_ref) {
        var name = _ref.name;
        return name === 'position';
      });
      var normalAttribute = this.attributes.find(function (_ref2) {
        var name = _ref2.name;
        return name === 'normal';
      });

      if (positionAttribute) {
        positionAttribute.dirty = true; // @ts-ignore

        if (positionAttribute.data && positionAttribute.data.length) {
          // @ts-ignore
          for (var i = 0; i < positionAttribute.data.length; i += 3) {
            var position = _glMatrix.vec4.fromValues( // @ts-ignore
            positionAttribute.data[i], // @ts-ignore
            positionAttribute.data[i + 1], // @ts-ignore
            positionAttribute.data[i + 2], 1);

            _glMatrix.vec4.transformMat4(position, position, matrix);

            if ((0, _isTypedarray.isTypedArray)(positionAttribute.data)) {
              // @ts-ignore
              positionAttribute.data.set([position[0], position[1], position[2]], i);
            } else {
              // @ts-ignore
              positionAttribute.data[i] = position[0]; // @ts-ignore

              positionAttribute.data[i + 1] = position[1]; // @ts-ignore

              positionAttribute.data[i + 2] = position[2];
            }
          }
        }
      }

      if (normalAttribute) {
        var normalMatrix = _glMatrix.mat3.normalFromMat4(_glMatrix.mat3.create(), matrix); // @ts-ignore


        if (normalAttribute.data && normalAttribute.data.length) {
          // @ts-ignore
          for (var _i = 0; _i < normalAttribute.data.length; _i += 3) {
            var normal = _glMatrix.vec3.fromValues( // @ts-ignore
            normalAttribute.data[_i], // @ts-ignore
            normalAttribute.data[_i + 1], // @ts-ignore
            normalAttribute.data[_i + 2]);

            _glMatrix.vec3.transformMat3(normal, normal, normalMatrix);

            _glMatrix.vec3.normalize(normal, normal);

            if ((0, _isTypedarray.isTypedArray)(normalAttribute.data)) {
              // @ts-ignore
              normalAttribute.data.set([normal[0], normal[1], normal[2]], _i);
            } else {
              // @ts-ignore
              normalAttribute.data[_i] = normal[0]; // @ts-ignore

              normalAttribute.data[_i + 1] = normal[1]; // @ts-ignore

              normalAttribute.data[_i + 2] = normal[2];
            }
          }
        }
      }
    }
  }]);
  return GeometryComponent;
}(_ComponentManager.Component);

exports.GeometryComponent = GeometryComponent;
//# sourceMappingURL=GeometryComponent.js.map