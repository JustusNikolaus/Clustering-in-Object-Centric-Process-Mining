"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _WebGPUBuffer = _interopRequireDefault(require("./WebGPUBuffer"));

var WebGPUElements = /*#__PURE__*/function () {
  function WebGPUElements(engine, options) {
    (0, _classCallCheck2.default)(this, WebGPUElements);
    this.engine = engine;
    this.options = options;
    this.indexCount = void 0;
    this.buffer = void 0;
    var _options = options,
        data = _options.data,
        usage = _options.usage,
        type = _options.type,
        count = _options.count;
    this.indexCount = count || 0;
    this.buffer = new _WebGPUBuffer.default(engine, {
      // @ts-ignore
      data: data instanceof Array ? new Uint16Array(data) : data,
      usage: WebGPUConstants.BufferUsage.Index | WebGPUConstants.BufferUsage.CopyDst
    });
  }

  (0, _createClass2.default)(WebGPUElements, [{
    key: "get",
    value: function get() {
      return this.buffer;
    }
  }, {
    key: "subData",
    value: function subData(options) {
      this.buffer.subData(options);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.buffer.destroy();
    }
  }]);
  return WebGPUElements;
}();

exports.default = WebGPUElements;
//# sourceMappingURL=WebGPUElements.js.map