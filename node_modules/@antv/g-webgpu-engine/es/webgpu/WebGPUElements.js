import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import * as WebGPUConstants from '@webgpu/types/dist/constants';
import WebGPUBuffer from './WebGPUBuffer';

var WebGPUElements = /*#__PURE__*/function () {
  function WebGPUElements(engine, options) {
    _classCallCheck(this, WebGPUElements);

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
    this.buffer = new WebGPUBuffer(engine, {
      // @ts-ignore
      data: data instanceof Array ? new Uint16Array(data) : data,
      usage: WebGPUConstants.BufferUsage.Index | WebGPUConstants.BufferUsage.CopyDst
    });
  }

  _createClass(WebGPUElements, [{
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

export { WebGPUElements as default };
//# sourceMappingURL=WebGPUElements.js.map