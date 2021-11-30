"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var WebGPUFramebuffer = /*#__PURE__*/function () {
  function WebGPUFramebuffer(engine, options) {
    (0, _classCallCheck2.default)(this, WebGPUFramebuffer);
    this.engine = engine;
    this.options = options;
    this.colorTexture = void 0;
    this.depthTexture = void 0;
    this.width = 0;
    this.height = 0;
    var _options = options,
        width = _options.width,
        height = _options.height,
        color = _options.color,
        colors = _options.colors,
        depth = _options.depth,
        stencil = _options.stencil;

    if (color) {
      this.colorTexture = color;
    }

    if (depth) {
      this.depthTexture = depth;
    } // TODO: depth & stencil

  }

  (0, _createClass2.default)(WebGPUFramebuffer, [{
    key: "get",
    value: function get() {
      var _this$colorTexture, _this$depthTexture;

      return {
        color: (_this$colorTexture = this.colorTexture) === null || _this$colorTexture === void 0 ? void 0 : _this$colorTexture.get(),
        depth: (_this$depthTexture = this.depthTexture) === null || _this$depthTexture === void 0 ? void 0 : _this$depthTexture.get()
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$colorTexture2, _this$depthTexture2;

      (_this$colorTexture2 = this.colorTexture) === null || _this$colorTexture2 === void 0 ? void 0 : _this$colorTexture2.destroy();
      (_this$depthTexture2 = this.depthTexture) === null || _this$depthTexture2 === void 0 ? void 0 : _this$depthTexture2.destroy();
    }
  }, {
    key: "resize",
    value: function resize(_ref) {
      var width = _ref.width,
          height = _ref.height;

      if (width !== this.width || height !== this.height) {
        var _this$colorTexture3, _this$depthTexture3;

        (_this$colorTexture3 = this.colorTexture) === null || _this$colorTexture3 === void 0 ? void 0 : _this$colorTexture3.resize({
          width: width,
          height: height
        });
        (_this$depthTexture3 = this.depthTexture) === null || _this$depthTexture3 === void 0 ? void 0 : _this$depthTexture3.resize({
          width: width,
          height: height
        });
      }

      this.width = width;
      this.height = height;
    }
  }]);
  return WebGPUFramebuffer;
}();

exports.default = WebGPUFramebuffer;
//# sourceMappingURL=WebGPUFramebuffer.js.map