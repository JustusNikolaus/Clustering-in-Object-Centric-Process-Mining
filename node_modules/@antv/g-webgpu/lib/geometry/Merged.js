"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Merged = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _inversify = require("inversify");

var _ = require(".");

var _isNumber = require("../utils/is-number");

var _isTypedarray = require("../utils/is-typedarray");

var _typedarray = require("../utils/typedarray");

var _dec, _class;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var
/**
 * merge many geometries into one, use a batch of draw calls
 */
Merged = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Merged, _Geometry);

  var _super = _createSuper(Merged);

  function Merged() {
    (0, _classCallCheck2.default)(this, Merged);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Merged, [{
    key: "onEntityCreated",
    value: function onEntityCreated() {
      var _this$config$geometri = this.config.geometries,
          geometries = _this$config$geometri === void 0 ? [] : _this$config$geometri;
      var mergedComponent = this.getComponent();
      mergedComponent.aabb = new _gWebgpuCore.AABB();
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
          mergedIndices.push.apply(mergedIndices, (0, _toConsumableArray2.default)(indices.map(function (index) {
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
              if ((0, _isNumber.isNumber)(attribute.data)) {
                // @ts-ignore
                mergedAttributes[i].push(attribute.data);
              } else if ((0, _isTypedarray.isTypedArray)(attribute.data)) {
                // @ts-ignore
                mergedAttributes[i].data = (0, _typedarray.merge)( // @ts-ignore
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
}(_.Geometry)) || _class);
exports.Merged = Merged;
//# sourceMappingURL=Merged.js.map