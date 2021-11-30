import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { inject, injectable, named } from 'inversify';
import { IDENTIFIER } from '../../identifier';
import { CopyPass } from './passes/CopyPass';
import { PixelPickingPass } from './passes/PixelPickingPass';
import { RenderPass } from './passes/RenderPass';
export var RendererSystem = (_dec = injectable(), _dec2 = inject(IDENTIFIER.Systems), _dec3 = named(IDENTIFIER.FrameGraphSystem), _dec4 = inject(IDENTIFIER.RenderPassFactory), _dec5 = inject(IDENTIFIER.ConfigService), _dec6 = inject(IDENTIFIER.ResourcePool), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function RendererSystem() {
    _classCallCheck(this, RendererSystem);

    _initializerDefineProperty(this, "frameGraphSystem", _descriptor, this);

    _initializerDefineProperty(this, "renderPassFactory", _descriptor2, this);

    _initializerDefineProperty(this, "configService", _descriptor3, this);

    _initializerDefineProperty(this, "resourcePool", _descriptor4, this);
  }

  _createClass(RendererSystem, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(views) {
        var _this$renderPassFacto, setupRenderPass, executeRenderPass, renderPass, _this$renderPassFacto2, setupCopyPass, executeCopyPass, tearDownCopyPass, copyPass;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                _this$renderPassFacto = this.renderPassFactory(RenderPass.IDENTIFIER), setupRenderPass = _this$renderPassFacto.setup, executeRenderPass = _this$renderPassFacto.execute;
                renderPass = this.frameGraphSystem.addPass(RenderPass.IDENTIFIER, setupRenderPass, executeRenderPass);
                _this$renderPassFacto2 = this.renderPassFactory(CopyPass.IDENTIFIER), setupCopyPass = _this$renderPassFacto2.setup, executeCopyPass = _this$renderPassFacto2.execute, tearDownCopyPass = _this$renderPassFacto2.tearDown;
                copyPass = this.frameGraphSystem.addPass(CopyPass.IDENTIFIER, setupCopyPass, executeCopyPass, tearDownCopyPass);
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
      var pickingPass = this.renderPassFactory(PixelPickingPass.IDENTIFIER);
      return pickingPass.pick(position, view);
    }
  }]);

  return RendererSystem;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frameGraphSystem", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderPassFactory", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "configService", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "resourcePool", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=System.js.map