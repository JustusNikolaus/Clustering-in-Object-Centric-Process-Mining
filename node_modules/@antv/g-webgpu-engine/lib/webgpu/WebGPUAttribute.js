"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var WebGPUAttribute = /*#__PURE__*/function () {
  function WebGPUAttribute(engine, options) {
    (0, _classCallCheck2.default)(this, WebGPUAttribute);
    this.engine = engine;
    this.options = options;
    this.attribute = void 0;
    this.buffer = void 0;
    var _options = options,
        buffer = _options.buffer,
        offset = _options.offset,
        stride = _options.stride,
        normalized = _options.normalized,
        size = _options.size,
        divisor = _options.divisor,
        arrayStride = _options.arrayStride,
        attributes = _options.attributes,
        stepMode = _options.stepMode;
    this.buffer = buffer;
    this.attribute = {
      buffer: buffer.get(),
      offset: offset || 0,
      stride: stride || 0,
      normalized: normalized || false,
      divisor: divisor || 0,
      arrayStride: arrayStride || 0,
      // @ts-ignore
      attributes: attributes,
      stepMode: stepMode || 'vertex'
    };

    if (size) {
      this.attribute.size = size;
    }
  }

  (0, _createClass2.default)(WebGPUAttribute, [{
    key: "get",
    value: function get() {
      return this.attribute;
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(options) {
      this.buffer.subData(options);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.buffer.destroy();
    }
  }]);
  return WebGPUAttribute;
}();

exports.default = WebGPUAttribute;
//# sourceMappingURL=WebGPUAttribute.js.map