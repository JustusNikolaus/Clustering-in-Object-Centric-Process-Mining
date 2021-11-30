import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var _dec, _class, _temp;

/**
 * implements renderService with WebGPU API
 * @see https://webgpu.io/
 * @see https://github.com/BabylonJS/Babylon.js/blob/WebGPU/src/Engines/webgpuEngine.ts
 */
import { isSafari } from '@antv/g-webgpu-core'; // import { Glslang } from '@webgpu/glslang/dist/web-devel/glslang.onefile';

import * as WebGPUConstants from '@webgpu/types/dist/constants';
import { injectable } from 'inversify';
import glslang from './glslang';
import WebGPUAttribute from './WebGPUAttribute';
import WebGPUBuffer from './WebGPUBuffer';
import WebGPUComputeModel from './WebGPUComputeModel';
import WebGPUElements from './WebGPUElements';
import WebGPUFramebuffer from './WebGPUFramebuffer';
import WebGPUModel from './WebGPUModel';
import WebGPUTexture2D from './WebGPUTexture2D';
export
/**
 * regl renderer
 */
var WebGPUEngine = (_dec = injectable(), _dec(_class = (_temp = /*#__PURE__*/function () {
  function WebGPUEngine() {
    var _this = this;

    _classCallCheck(this, WebGPUEngine);

    this.supportWebGPU = true;
    this.useWGSL = false;
    this.options = void 0;
    this.canvas = void 0;
    this.context = void 0;
    this.glslang = void 0;
    this.adapter = void 0;
    this.device = void 0;
    this.swapChain = void 0;
    this.mainPassSampleCount = void 0;
    this.mainTexture = void 0;
    this.depthTexture = void 0;
    this.mainColorAttachments = void 0;
    this.mainTextureExtends = void 0;
    this.mainDepthAttachment = void 0;
    this.uploadEncoder = void 0;
    this.renderEncoder = void 0;
    this.computeEncoder = void 0;
    this.renderTargetEncoder = void 0;
    this.commandBuffers = new Array(4).fill(undefined);
    this.currentRenderPass = null;
    this.mainRenderPass = null;
    this.currentRenderTargetViewDescriptor = void 0;
    this.currentComputePass = null;
    this.bundleEncoder = void 0;
    this.tempBuffers = [];
    this.currentRenderTarget = null;
    this.uploadEncoderDescriptor = {
      label: 'upload'
    };
    this.renderEncoderDescriptor = {
      label: 'render'
    };
    this.renderTargetEncoderDescriptor = {
      label: 'renderTarget'
    };
    this.computeEncoderDescriptor = {
      label: 'compute'
    };
    this.pipelines = {};
    this.computePipelines = {};
    this.defaultSampleCount = 4;
    this.clearDepthValue = 1;
    this.clearStencilValue = 0;
    this.transientViewport = {
      x: Infinity,
      y: 0,
      width: 0,
      height: 0
    };
    this.cachedViewport = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };

    this.clear = function (options) {
      var framebuffer = options.framebuffer,
          color = options.color,
          depth = options.depth,
          stencil = options.stencil;

      if (_this.options.supportCompute) {
        _this.startComputePass();
      } // We need to recreate the render pass so that the new parameters for clear color / depth / stencil are taken into account


      if (_this.currentRenderTarget) {
        if (_this.currentRenderPass) {
          _this.endRenderTargetRenderPass();
        }

        _this.startRenderTargetRenderPass(_this.currentRenderTarget, color ? color : null, !!depth, !!stencil);
      } else {
        // if (this.useReverseDepthBuffer) {
        //     this._depthCullingState.depthFunc = Constants.GREATER;
        // }
        _this.mainColorAttachments[0].loadValue = color ? color : WebGPUConstants.LoadOp.Load;
        _this.mainDepthAttachment.depthLoadValue = depth ? depth : WebGPUConstants.LoadOp.Load;
        _this.mainDepthAttachment.stencilLoadValue = stencil ? _this.clearStencilValue : WebGPUConstants.LoadOp.Load;

        if (_this.mainRenderPass) {
          _this.endMainRenderPass();
        }

        _this.startMainRenderPass();
      }
    };

    this.createModel = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options) {
        var model;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                model = new WebGPUModel(_this, options);
                _context.next = 3;
                return model.init();

              case 3:
                return _context.abrupt("return", model);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.createAttribute = function (options) {
      return new WebGPUAttribute(_this, options);
    };

    this.createBuffer = function (options) {
      return new WebGPUBuffer(_this, options);
    };

    this.createElements = function (options) {
      return new WebGPUElements(_this, options);
    };

    this.createTexture2D = function (options) {
      return new WebGPUTexture2D(_this, options);
    };

    this.createFramebuffer = function (options) {
      return new WebGPUFramebuffer(_this, options);
    };

    this.useFramebuffer = function (framebuffer, drawCommands) {
      // bind
      if (_this.currentRenderTarget) {
        _this.unbindFramebuffer(_this.currentRenderTarget);
      }

      _this.currentRenderTarget = framebuffer; // TODO: use mipmap options in framebuffer

      _this.currentRenderTargetViewDescriptor = {
        dimension: WebGPUConstants.TextureViewDimension.E2d,
        // mipLevelCount: bindWithMipMaps ? WebGPUTextureHelper.computeNumMipmapLevels(texture.width, texture.height) - lodLevel : 1,
        // baseArrayLayer: faceIndex,
        // baseMipLevel: lodLevel,
        arrayLayerCount: 1,
        aspect: WebGPUConstants.TextureAspect.All
      };
      _this.currentRenderPass = null;
      drawCommands();
    };

    this.createComputeModel = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(context) {
        var model;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = new WebGPUComputeModel(_this, context);
                _context2.next = 3;
                return model.init();

              case 3:
                return _context2.abrupt("return", model);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.getCanvas = function () {
      return _this.canvas;
    };

    this.getGLContext = function () {
      throw new Error('Method not implemented.');
    };

    this.viewport = function (_ref3) {
      var x = _ref3.x,
          y = _ref3.y,
          width = _ref3.width,
          height = _ref3.height;

      if (!_this.currentRenderPass) {
        // call viewport() before current render pass created
        _this.transientViewport = {
          x: x,
          y: y,
          width: width,
          height: height
        };
      } else if (_this.transientViewport.x !== Infinity) {
        var renderPass = _this.getCurrentRenderPass(); // @see https://gpuweb.github.io/gpuweb/#dom-gpurenderpassencoder-setviewport


        renderPass.setViewport(_this.transientViewport.x, _this.transientViewport.y, _this.transientViewport.width, _this.transientViewport.height, 0, 1);
      } else if (x !== _this.cachedViewport.x || y !== _this.cachedViewport.y || width !== _this.cachedViewport.width || height !== _this.cachedViewport.height) {
        _this.cachedViewport = {
          x: x,
          y: y,
          width: width,
          height: height
        };

        var _renderPass = _this.getCurrentRenderPass();

        _renderPass.setViewport(x, y, width, height, 0, 1);
      }
    };

    this.readPixels = function (options) {
      throw new Error('Method not implemented.');
    };
  }

  _createClass(WebGPUEngine, [{
    key: "isFloatSupported",
    value: function isFloatSupported() {
      return true;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(config) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.canvas = config.canvas;
                this.options = config;
                this.useWGSL = !!config.useWGSL;
                this.mainPassSampleCount = config.antialiasing ? this.defaultSampleCount : 1;
                _context3.next = 6;
                return this.initGlslang();

              case 6:
                this.initContextAndSwapChain();
                this.initMainAttachments();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init(_x3) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "setScissor",
    value: function setScissor(scissor) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.mainTexture) {
        this.mainTexture.destroy();
      }

      if (this.depthTexture) {
        this.depthTexture.destroy();
      }

      this.tempBuffers.forEach(function (buffer) {
        return buffer.destroy();
      });
      this.tempBuffers = [];
    }
  }, {
    key: "beginFrame",
    value: function beginFrame() {
      this.uploadEncoder = this.device.createCommandEncoder(this.uploadEncoderDescriptor);
      this.renderEncoder = this.device.createCommandEncoder(this.renderEncoderDescriptor);
      this.renderTargetEncoder = this.device.createCommandEncoder(this.renderTargetEncoderDescriptor);

      if (this.options.supportCompute) {
        this.computeEncoder = this.device.createCommandEncoder(this.computeEncoderDescriptor);
      }
    }
  }, {
    key: "endFrame",
    value: function endFrame() {
      if (this.options.supportCompute) {
        this.endComputePass();
      }

      this.endMainRenderPass();
      this.commandBuffers[0] = this.uploadEncoder.finish();
      this.commandBuffers[1] = this.renderEncoder.finish();

      if (this.options.supportCompute) {
        this.commandBuffers[2] = this.computeEncoder.finish();
      }

      this.commandBuffers[3] = this.renderTargetEncoder.finish();

      if (isSafari) {
        this.device // @ts-ignore
        .getQueue().submit(this.commandBuffers.filter(function (buffer) {
          return buffer;
        }));
      } else {
        this.device.defaultQueue.submit(this.commandBuffers.filter(function (buffer) {
          return buffer;
        }));
      }
    }
  }, {
    key: "getCurrentRenderPass",
    value: function getCurrentRenderPass() {
      if (this.currentRenderTarget && !this.currentRenderPass) {
        this.startRenderTargetRenderPass(this.currentRenderTarget, null, false, false);
      } else if (!this.currentRenderPass) {
        this.startMainRenderPass();
      }

      return this.currentRenderPass;
    }
  }, {
    key: "initGlslang",
    value: function () {
      var _initGlslang = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var _navigator, _navigator$gpu;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return glslang();

              case 2:
                this.glslang = _context4.sent;
                _context4.next = 5;
                return (_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$gpu = _navigator.gpu) === null || _navigator$gpu === void 0 ? void 0 : _navigator$gpu.requestAdapter();

              case 5:
                this.adapter = _context4.sent;
                _context4.next = 8;
                return this.adapter.requestDevice();

              case 8:
                this.device = _context4.sent;

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function initGlslang() {
        return _initGlslang.apply(this, arguments);
      }

      return initGlslang;
    }()
  }, {
    key: "initContextAndSwapChain",
    value: function initContextAndSwapChain() {
      this.context = this.canvas.getContext(isSafari ? 'gpu' : 'gpupresent');
      this.swapChain = this.context.configureSwapChain({
        device: this.device,
        format: this.options.swapChainFormat,
        usage: WebGPUConstants.TextureUsage.OutputAttachment | WebGPUConstants.TextureUsage.CopySrc
      });
    }
  }, {
    key: "initMainAttachments",
    value: function initMainAttachments() {
      this.mainTextureExtends = {
        width: this.canvas.width,
        height: this.canvas.height,
        depth: 1
      };

      if (this.options.antialiasing) {
        var mainTextureDescriptor = {
          size: this.mainTextureExtends,
          // TODO: arrayLayerCount is deprecated: use size.depth
          // arrayLayerCount: 1,
          mipLevelCount: 1,
          sampleCount: this.mainPassSampleCount,
          dimension: WebGPUConstants.TextureDimension.E2d,
          format: WebGPUConstants.TextureFormat.BGRA8Unorm,
          usage: WebGPUConstants.TextureUsage.OutputAttachment
        };

        if (this.mainTexture) {
          this.mainTexture.destroy();
        }

        this.mainTexture = this.device.createTexture(mainTextureDescriptor);
        this.mainColorAttachments = [{
          attachment: isSafari ? // @ts-ignore
          this.mainTexture.createDefaultView() : this.mainTexture.createView(),
          loadValue: [0, 0, 0, 1],
          storeOp: WebGPUConstants.StoreOp.Store
        }];
      } else {
        this.mainColorAttachments = [{
          attachment: isSafari ? // @ts-ignore
          this.swapChain.getCurrentTexture().createDefaultView() : this.swapChain.getCurrentTexture().createView(),
          loadValue: [0, 0, 0, 1],
          storeOp: WebGPUConstants.StoreOp.Store
        }];
      }

      var depthTextureDescriptor = {
        size: this.mainTextureExtends,
        // arrayLayerCount: 1,
        mipLevelCount: 1,
        sampleCount: this.mainPassSampleCount,
        dimension: WebGPUConstants.TextureDimension.E2d,
        format: isSafari ? 'depth32float-stencil8' : WebGPUConstants.TextureFormat.Depth24PlusStencil8,
        usage: WebGPUConstants.TextureUsage.OutputAttachment
      };

      if (this.depthTexture) {
        this.depthTexture.destroy();
      }

      this.depthTexture = this.device.createTexture( // @ts-ignore
      depthTextureDescriptor);
      this.mainDepthAttachment = {
        attachment: isSafari ? // @ts-ignore
        this.depthTexture.createDefaultView() : this.depthTexture.createView(),
        depthLoadValue: this.clearDepthValue,
        depthStoreOp: WebGPUConstants.StoreOp.Store,
        stencilLoadValue: this.clearStencilValue,
        stencilStoreOp: WebGPUConstants.StoreOp.Store
      };
    }
  }, {
    key: "startComputePass",
    value: function startComputePass() {
      if (this.currentComputePass) {
        this.endComputePass();
      }

      this.currentComputePass = this.computeEncoder.beginComputePass();
    }
  }, {
    key: "startMainRenderPass",
    value: function startMainRenderPass() {
      if (this.currentRenderPass && !this.currentRenderTarget) {
        this.endMainRenderPass();
      } // Resolve in case of MSAA


      if (this.options.antialiasing) {
        this.mainColorAttachments[0].resolveTarget = isSafari ? // @ts-ignore
        this.swapChain.getCurrentTexture().createDefaultView() : this.swapChain.getCurrentTexture().createView();
      } else {
        this.mainColorAttachments[0].attachment = isSafari ? // @ts-ignore
        this.swapChain.getCurrentTexture().createDefaultView() : this.swapChain.getCurrentTexture().createView();
      }

      this.currentRenderPass = this.renderEncoder.beginRenderPass({
        colorAttachments: this.mainColorAttachments,
        depthStencilAttachment: this.mainDepthAttachment // TODO: use framebuffer's depth & stencil

      });
      this.mainRenderPass = this.currentRenderPass;

      if (this.cachedViewport) {
        this.viewport(this.cachedViewport);
      }
    }
  }, {
    key: "startRenderTargetRenderPass",
    value: function startRenderTargetRenderPass(renderTarget, clearColor, clearDepth) {
      var _renderTarget$get$col, _renderTarget$get$dep;

      var clearStencil = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var gpuTexture = (_renderTarget$get$col = renderTarget.get().color) === null || _renderTarget$get$col === void 0 ? void 0 : _renderTarget$get$col.texture;
      var colorTextureView;

      if (gpuTexture) {
        colorTextureView = gpuTexture.createView(this.currentRenderTargetViewDescriptor);
      }

      var depthStencilTexture = (_renderTarget$get$dep = renderTarget.get().depth) === null || _renderTarget$get$dep === void 0 ? void 0 : _renderTarget$get$dep.texture;
      var depthStencilTextureView;

      if (depthStencilTexture) {
        depthStencilTextureView = depthStencilTexture.createView();
      }

      var renderPass = this.renderTargetEncoder.beginRenderPass({
        colorAttachments: [{
          attachment: colorTextureView,
          loadValue: clearColor !== null ? clearColor : WebGPUConstants.LoadOp.Load,
          storeOp: WebGPUConstants.StoreOp.Store
        }],
        depthStencilAttachment: depthStencilTexture && depthStencilTextureView ? {
          attachment: depthStencilTextureView,
          depthLoadValue: clearDepth ? this.clearDepthValue : WebGPUConstants.LoadOp.Load,
          depthStoreOp: WebGPUConstants.StoreOp.Store,
          stencilLoadValue: clearStencil ? this.clearStencilValue : WebGPUConstants.LoadOp.Load,
          stencilStoreOp: WebGPUConstants.StoreOp.Store
        } : undefined
      });
      this.currentRenderPass = renderPass;

      if (this.cachedViewport) {
        this.viewport(this.cachedViewport);
      } // TODO WEBGPU set the scissor rect and the stencil reference value

    }
  }, {
    key: "endMainRenderPass",
    value: function endMainRenderPass() {
      if (this.currentRenderPass === this.mainRenderPass && this.currentRenderPass !== null) {
        this.currentRenderPass.endPass();
        this.resetCachedViewport();
        this.currentRenderPass = null;
        this.mainRenderPass = null;
      }
    }
  }, {
    key: "endComputePass",
    value: function endComputePass() {
      if (this.currentComputePass) {
        this.currentComputePass.endPass();
        this.currentComputePass = null;
      }
    }
  }, {
    key: "endRenderTargetRenderPass",
    value: function endRenderTargetRenderPass() {
      if (this.currentRenderPass) {
        this.currentRenderPass.endPass();
        this.resetCachedViewport();
      }
    }
  }, {
    key: "resetCachedViewport",
    value: function resetCachedViewport() {
      this.cachedViewport = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
  }, {
    key: "unbindFramebuffer",
    value: function unbindFramebuffer(framebuffer) {
      // unbind
      if (this.currentRenderPass && this.currentRenderPass !== this.mainRenderPass) {
        this.endRenderTargetRenderPass();
      }

      this.transientViewport.x = Infinity;
      this.currentRenderTarget = null; // if (texture.generateMipMaps && !disableGenerateMipMaps && !texture.isCube) {
      //   this._generateMipmaps(texture);
      // }

      this.currentRenderPass = this.mainRenderPass;
    }
  }]);

  return WebGPUEngine;
}(), _temp)) || _class);
//# sourceMappingURL=index.js.map