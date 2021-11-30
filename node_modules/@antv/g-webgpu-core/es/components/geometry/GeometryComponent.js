import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { mat3, vec3, vec4 } from 'gl-matrix';
import { Component } from '../../ComponentManager';
import { isTypedArray } from '../../utils/is-typedarray';
export var GeometryComponent = /*#__PURE__*/function (_Component) {
  _inherits(GeometryComponent, _Component);

  var _super = _createSuper(GeometryComponent);

  // instanced count
  function GeometryComponent(data) {
    var _this;

    _classCallCheck(this, GeometryComponent);

    _this = _super.call(this, data);
    _this.dirty = true;
    _this.attributes = [];
    _this.indices = void 0;
    _this.indicesBuffer = void 0;
    _this.vertexCount = 0;
    _this.maxInstancedCount = void 0;
    _this.aabb = void 0;
    _this.entity = void 0;
    Object.assign(_assertThisInitialized(_this), data);
    return _this;
  }
  /**
   * @see https://threejs.org/docs/#api/en/core/BufferAttribute
   */


  _createClass(GeometryComponent, [{
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
            var position = vec4.fromValues( // @ts-ignore
            positionAttribute.data[i], // @ts-ignore
            positionAttribute.data[i + 1], // @ts-ignore
            positionAttribute.data[i + 2], 1);
            vec4.transformMat4(position, position, matrix);

            if (isTypedArray(positionAttribute.data)) {
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
        var normalMatrix = mat3.normalFromMat4(mat3.create(), matrix); // @ts-ignore

        if (normalAttribute.data && normalAttribute.data.length) {
          // @ts-ignore
          for (var _i = 0; _i < normalAttribute.data.length; _i += 3) {
            var normal = vec3.fromValues( // @ts-ignore
            normalAttribute.data[_i], // @ts-ignore
            normalAttribute.data[_i + 1], // @ts-ignore
            normalAttribute.data[_i + 2]);
            vec3.transformMat3(normal, normal, normalMatrix);
            vec3.normalize(normal, normal);

            if (isTypedArray(normalAttribute.data)) {
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
}(Component);
//# sourceMappingURL=GeometryComponent.js.map