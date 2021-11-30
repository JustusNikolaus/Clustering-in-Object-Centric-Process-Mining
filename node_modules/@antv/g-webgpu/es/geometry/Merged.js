import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { AABB } from '@antv/g-webgpu-core';
import { injectable } from 'inversify';
import { Geometry } from '.';
import { isNumber } from '../utils/is-number';
import { isTypedArray } from '../utils/is-typedarray';
import { merge } from '../utils/typedarray';
export var
/**
 * merge many geometries into one, use a batch of draw calls
 */
Merged = (_dec = injectable(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  _inherits(Merged, _Geometry);

  var _super = _createSuper(Merged);

  function Merged() {
    _classCallCheck(this, Merged);

    return _super.apply(this, arguments);
  }

  _createClass(Merged, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this$config$geometri = this.config.geometries,
          geometries = _this$config$geometri === void 0 ? [] : _this$config$geometri;
      var mergedComponent = this.getComponent();
      mergedComponent.aabb = new AABB();
      var mergedAttributes = [];
      var mergedIndices = [];
      var indexOffset = 0;
      geometries.forEach(function (geometry) {
        var aabb = geometry.aabb,
            indices = geometry.indices,
            vertexCount = geometry.vertexCount,
            attributes = geometry.attributes; // merge aabb

        mergedComponent.aabb.add(aabb);
        mergedComponent.vertexCount += vertexCount; // merge indices

        if (indices) {
          mergedIndices.push.apply(mergedIndices, _toConsumableArray(indices.map(function (index) {
            return index + indexOffset;
          })));
        }

        indexOffset += vertexCount; // merge attributes

        attributes.forEach(function (attribute, i) {
          if (!mergedAttributes[i]) {
            mergedAttributes[i] = attribute;
            mergedAttributes[i].dirty = true;
          } else {
            if (attribute.data) {
              if (isNumber(attribute.data)) {
                // @ts-ignore
                mergedAttributes[i].push(attribute.data);
              } else if (isTypedArray(attribute.data)) {
                // @ts-ignore
                mergedAttributes[i].data = merge( // @ts-ignore
                mergedAttributes[i].data, attribute.data);
              } else {
                // @ts-ignore
                mergedAttributes[i].data = mergedAttributes[i].data.concat(attribute.data);
              }
            }
          }
        });
      });
      mergedComponent.attributes = mergedAttributes;
      mergedComponent.indices = Uint32Array.from(mergedIndices);
      mergedComponent.dirty = true;
    }
  }]);

  return Merged;
}(Geometry)) || _class);
//# sourceMappingURL=Merged.js.map