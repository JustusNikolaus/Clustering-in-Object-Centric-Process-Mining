"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _constants2 = require("./constants");

/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
var WebGPUTexture2D = /*#__PURE__*/function () {
  function WebGPUTexture2D(engine, options) {
    (0, _classCallCheck2.default)(this, WebGPUTexture2D);
    this.engine = engine;
    this.options = options;
    this.texture = void 0;
    this.sampler = void 0;
    this.width = void 0;
    this.height = void 0;
    this.createTexture();
  }

  (0, _createClass2.default)(WebGPUTexture2D, [{
    key: "get",
    value: function get() {
      return {
        texture: this.texture,
        sampler: this.sampler
      };
    }
  }, {
    key: "update",
    value: function update() {// TODO
    }
  }, {
    key: "resize",
    value: function resize(_ref) {
      var width = _ref.width,
          height = _ref.height;

      // TODO: it seems that Texture doesn't support `resize`
      if (width !== this.width || height !== this.height) {
        this.destroy();
        this.createTexture();
      }

      this.width = width;
      this.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.texture) {
        this.texture.destroy();
      }
    }
  }, {
    key: "createTexture",
    value: function createTexture() {
      var _this$options = this.options,
          data = _this$options.data,
          _this$options$type = _this$options.type,
          type = _this$options$type === void 0 ? _gWebgpuCore.gl.UNSIGNED_BYTE : _this$options$type,
          width = _this$options.width,
          height = _this$options.height,
          _this$options$flipY = _this$options.flipY,
          flipY = _this$options$flipY === void 0 ? false : _this$options$flipY,
          _this$options$format = _this$options.format,
          format = _this$options$format === void 0 ? _gWebgpuCore.gl.RGBA : _this$options$format,
          _this$options$mipmap = _this$options.mipmap,
          mipmap = _this$options$mipmap === void 0 ? false : _this$options$mipmap,
          _this$options$wrapS = _this$options.wrapS,
          wrapS = _this$options$wrapS === void 0 ? _gWebgpuCore.gl.CLAMP_TO_EDGE : _this$options$wrapS,
          _this$options$wrapT = _this$options.wrapT,
          wrapT = _this$options$wrapT === void 0 ? _gWebgpuCore.gl.CLAMP_TO_EDGE : _this$options$wrapT,
          _this$options$aniso = _this$options.aniso,
          aniso = _this$options$aniso === void 0 ? 0 : _this$options$aniso,
          _this$options$alignme = _this$options.alignment,
          alignment = _this$options$alignme === void 0 ? 1 : _this$options$alignme,
          _this$options$premult = _this$options.premultiplyAlpha,
          premultiplyAlpha = _this$options$premult === void 0 ? false : _this$options$premult,
          _this$options$mag = _this$options.mag,
          mag = _this$options$mag === void 0 ? _gWebgpuCore.gl.NEAREST : _this$options$mag,
          _this$options$min = _this$options.min,
          min = _this$options$min === void 0 ? _gWebgpuCore.gl.NEAREST : _this$options$min,
          _this$options$colorSp = _this$options.colorSpace,
          colorSpace = _this$options$colorSp === void 0 ? _gWebgpuCore.gl.BROWSER_DEFAULT_WEBGL : _this$options$colorSp,
          usage = _this$options.usage;
      this.width = width;
      this.height = height;
      this.texture = this.engine.device.createTexture({
        size: [width, height, 1],
        // TODO: arrayLayerCount is deprecated: use size.depth
        // arrayLayerCount: 1,
        mipLevelCount: 1,
        // TODO: https://gpuweb.github.io/gpuweb/#dom-gputextureviewdescriptor-miplevelcount
        sampleCount: 1,
        dimension: WebGPUConstants.TextureDimension.E2d,
        format: _constants2.formatMap[format],
        // could throw texture binding usage mismatch
        usage: usage || WebGPUConstants.TextureUsage.Sampled | WebGPUConstants.TextureUsage.CopyDst
      });

      if (!usage || usage & WebGPUConstants.TextureUsage.Sampled) {
        this.sampler = this.engine.device.createSampler({
          addressModeU: _constants2.wrapModeMap[wrapS],
          addressModeV: _constants2.wrapModeMap[wrapT],
          addressModeW: _constants2.wrapModeMap[wrapS],
          // TODO: same as addressModeU
          magFilter: _constants2.filterMap[mag],
          minFilter: _constants2.filterMap[min],
          maxAnisotropy: aniso // @see https://gpuweb.github.io/gpuweb/#dom-gpusamplerdescriptor-maxanisotropy

        });
      }
    }
  }]);
  return WebGPUTexture2D;
}();

exports.default = WebGPUTexture2D;
//# sourceMappingURL=WebGPUTexture2D.js.map