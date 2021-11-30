"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RendererSystem = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _inversify = require("inversify");

var _identifier = require("../../identifier");

var _CopyPass = require("./passes/CopyPass");

var _PixelPickingPass = require("./passes/PixelPickingPass");

var _RenderPass = require("./passes/RenderPass");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

var RendererSystem = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.Systems), _dec3 = (0, _inversify.named)(_identifier.IDENTIFIER.FrameGraphSystem), _dec4 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderPassFactory), _dec5 = (0, _inversify.inject)(_identifier.IDENTIFIER.ConfigService), _dec6 = (0, _inversify.inject)(_identifier.IDENTIFIER.ResourcePool), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function RendererSystem() {
    (0, _classCallCheck2.default)(this, RendererSystem);
    (0, _initializerDefineProperty2.default)(this, "frameGraphSystem", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "renderPassFactory", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "configService", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "resourcePool", _descriptor4, this);
  }

  (0, _createClass2.default)(RendererSystem, [{
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(views) {
        var _this$renderPassFacto, setupRenderPass, executeRenderPass, renderPass, _this$renderPassFacto2, setupCopyPass, executeCopyPass, tearDownCopyPass, copyPass;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const pixelPickingPass = this.renderPassFactory<PixelPickingPassData>(
                //   PixelPickingPass.IDENTIFIER,
                // );
                // const {
                //   setup: setupPixelPickingPass,
                //   execute: executePixelPickingPass,
                //   tearDown: tearDownPickingPass,
                // } = pixelPickingPass;
                // this.frameGraphSystem.addPass<PixelPickingPassData>(
                //   PixelPickingPass.IDENTIFIER,
                //   setupPixelPickingPass,
                //   executePixelPickingPass,
                //   tearDownPickingPass,
                // );
                _this$renderPassFacto = this.renderPassFactory(_RenderPass.RenderPass.IDENTIFIER), setupRenderPass = _this$renderPassFacto.setup, executeRenderPass = _this$renderPassFacto.execute;
                renderPass = this.frameGraphSystem.addPass(_RenderPass.RenderPass.IDENTIFIER, setupRenderPass, executeRenderPass);
                _this$renderPassFacto2 = this.renderPassFactory(_CopyPass.CopyPass.IDENTIFIER), setupCopyPass = _this$renderPassFacto2.setup, executeCopyPass = _this$renderPassFacto2.execute, tearDownCopyPass = _this$renderPassFacto2.tearDown;
                copyPass = this.frameGraphSystem.addPass(_CopyPass.CopyPass.IDENTIFIER, setupCopyPass, executeCopyPass, tearDownCopyPass);
                this.frameGraphSystem.present(copyPass.data.output); // this.frameGraphSystem.present(renderPass.data.output);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "tearDown",
    value: function tearDown() {
      this.resourcePool.clean();
    }
  }, {
    key: "pick",
    value: function pick(position, view) {
      var pickingPass = this.renderPassFactory(_PixelPickingPass.PixelPickingPass.IDENTIFIER);
      return pickingPass.pick(position, view);
    }
  }]);
  return RendererSystem;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "frameGraphSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "renderPassFactory", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "configService", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "resourcePool", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.RendererSystem = RendererSystem;
//# sourceMappingURL=System.js.map