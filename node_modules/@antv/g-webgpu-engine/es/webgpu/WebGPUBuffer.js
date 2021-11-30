import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { isSafari } from '@antv/g-webgpu-core';
import * as WebGPUConstants from '@webgpu/types/dist/constants';

var WebGPUBuffer = /*#__PURE__*/function () {
  function WebGPUBuffer(engine, options) {
    _classCallCheck(this, WebGPUBuffer);

    this.engine = engine;
    this.options = options;
    this.buffer = void 0;
    var _options = options,
        data = _options.data,
        usage = _options.usage,
        type = _options.type;
    this.buffer = this.createBuffer(data instanceof Array ? new Float32Array(data) : data, // TODO: WebGL 和 WebGPU buffer usage 映射关系
    usage || WebGPUConstants.BufferUsage.Vertex | WebGPUConstants.BufferUsage.CopyDst);
  }

  _createClass(WebGPUBuffer, [{
    key: "get",
    value: function get() {
      return this.buffer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.buffer.destroy();
    }
  }, {
    key: "subData",
    value: function subData(_ref) {
      var data = _ref.data,
          offset = _ref.offset;
      this.setSubData(this.buffer, offset, data instanceof Array ? new Float32Array(data) : data);
    }
  }, {
    key: "createBuffer",
    value: function createBuffer(view, flags) {
      // @ts-ignore
      var padding = view.byteLength % 4;
      var verticesBufferDescriptor = {
        // @ts-ignore
        size: view.byteLength + padding,
        usage: flags
      };
      var buffer = this.engine.device.createBuffer(verticesBufferDescriptor);
      this.setSubData(buffer, 0, view);
      return buffer;
    }
    /**
     * 不同于 Babylon.js 的版本，使用最新的 GPUQueue.writeBuffer 方法
     * @see https://gpuweb.github.io/gpuweb/#dom-gpuqueue-writebuffer
     * 已废弃创建一个临时的 mapped buffer 用于拷贝数据 @see https://gpuweb.github.io/gpuweb/#GPUDevice-createBufferMapped
     * @see https://github.com/gpuweb/gpuweb/blob/master/design/BufferOperations.md#updating-data-to-an-existing-buffer-like-webgls-buffersubdata
     */

  }, {
    key: "setSubData",
    value: function setSubData(destBuffer, destOffset, srcArrayBuffer) {
      // deprecated API setSubData
      // destBuffer.setSubData(0, srcArrayBuffer);
      // deprecated API createBufferMapped
      // use createBuffer & getMappedRange instead
      // const [srcBuffer, arrayBuffer] = this.engine.device.createBufferMapped({
      //   size: byteCount,
      //   usage: WebGPUConstants.BufferUsage.CopySrc,
      // });
      var queue = isSafari ? // @ts-ignore
      this.engine.device.getQueue() : this.engine.device.defaultQueue; // @ts-ignore

      queue.writeBuffer(destBuffer, destOffset, srcArrayBuffer);
    }
  }]);

  return WebGPUBuffer;
}();

export { WebGPUBuffer as default };
//# sourceMappingURL=WebGPUBuffer.js.map