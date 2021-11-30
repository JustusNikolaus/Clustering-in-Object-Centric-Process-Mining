"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _inversify = require("inversify");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* babel-plugin-inline-import './material/shaders/map.frag.declaration.glsl' */
var mapFragDeclaration = "#ifdef USE_MAP\n  uniform sampler2D map;\n#endif";

/* babel-plugin-inline-import './material/shaders/map.frag.main.glsl' */
var mapFragMain = "#ifdef USE_MAP\n  vec4 texelColor = texture2D(map, vUv);\n  // texelColor = mapTexelToLinear(texelColor);\n  diffuseColor *= texelColor;\n#endif";

/* babel-plugin-inline-import './material/shaders/uv.frag.declaration.glsl' */
var uvFragDeclaration = "#if (defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ))\n  varying vec2 vUv;\n#endif";

/* babel-plugin-inline-import './material/shaders/uv.vert.declaration.glsl' */
var uvVertDeclaration = "#ifdef USE_UV\n  attribute vec2 uv;\n\t#ifdef UVS_VERTEX_ONLY\n    vec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif";

/* babel-plugin-inline-import './material/shaders/uv.vert.main.glsl' */
var uvVertMain = "#ifdef USE_UV\n  vUv = (uvTransform * vec3(uv, 1)).xy;\n#endif";
var Renderer = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.RenderEngine), _dec3 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ShaderModuleService), _dec4 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ConfigService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Renderer() {
    (0, _classCallCheck2.default)(this, Renderer);
    this.container = void 0;
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "shaderModule", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "configService", _descriptor3, this);
    this.inited = false;
    this.rendering = false;
    this.pendings = [];
    this.views = [];
    this.size = void 0;
  }

  (0, _createClass2.default)(Renderer, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var systems, config, _iterator, _step, system;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 模块化处理
                this.shaderModule.registerBuiltinModules();
                this.shaderModule.registerModule('uv.vert.declaration', {
                  vs: uvVertDeclaration
                });
                this.shaderModule.registerModule('uv.vert.main', {
                  vs: uvVertMain
                });
                this.shaderModule.registerModule('uv.frag.declaration', {
                  fs: uvFragDeclaration
                });
                this.shaderModule.registerModule('map.frag.declaration', {
                  fs: mapFragDeclaration
                });
                this.shaderModule.registerModule('map.frag.main', {
                  fs: mapFragMain
                });
                systems = this.container.getAll(_gWebgpuCore.IDENTIFIER.Systems);
                config = this.configService.get();

                if (!config.canvas) {
                  _context.next = 30;
                  break;
                }

                _context.next = 11;
                return this.engine.init({
                  canvas: config.canvas,
                  swapChainFormat: WebGPUConstants.TextureFormat.BGRA8Unorm,
                  antialiasing: false
                });

              case 11:
                _iterator = _createForOfIteratorHelper(systems);
                _context.prev = 12;

                _iterator.s();

              case 14:
                if ((_step = _iterator.n()).done) {
                  _context.next = 21;
                  break;
                }

                system = _step.value;

                if (!system.initialize) {
                  _context.next = 19;
                  break;
                }

                _context.next = 19;
                return system.initialize();

              case 19:
                _context.next = 14;
                break;

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](12);

                _iterator.e(_context.t0);

              case 26:
                _context.prev = 26;

                _iterator.f();

                return _context.finish(26);

              case 29:
                this.inited = true;

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 23, 26, 29]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "render",
    value: function () {
      var _render = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var systems,
            _len,
            views,
            _key,
            _iterator2,
            _step2,
            system,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.inited || this.rendering)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (this.pendings.length) {
                  this.pendings.forEach(function (pending) {
                    pending();
                  });
                }

                this.rendering = true;
                this.engine.beginFrame();
                systems = this.container.getAll(_gWebgpuCore.IDENTIFIER.Systems);

                for (_len = _args2.length, views = new Array(_len), _key = 0; _key < _len; _key++) {
                  views[_key] = _args2[_key];
                }

                _iterator2 = _createForOfIteratorHelper(systems);
                _context2.prev = 8;

                _iterator2.s();

              case 10:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 17;
                  break;
                }

                system = _step2.value;

                if (!system.execute) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 15;
                return system.execute(views);

              case 15:
                _context2.next = 10;
                break;

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](8);

                _iterator2.e(_context2.t0);

              case 22:
                _context2.prev = 22;

                _iterator2.f();

                return _context2.finish(22);

              case 25:
                // 录制一遍绘制命令，后续直接播放
                // if (this.useRenderBundle) {
                //   if (!this.renderBundleRecorded) {
                //     this.engine.startRecordBundle();
                //     if (this.onUpdate) {
                //       await this.onUpdate(this.engine);
                //     }
                //     this.renderBundle = this.engine.stopRecordBundle();
                //     this.renderBundleRecorded = true;
                //   }
                //   this.engine.executeBundles([this.renderBundle]);
                // } else {
                //   if (this.onUpdate) {
                //     await this.onUpdate(this.engine);
                //   }
                // }
                this.engine.endFrame();
                this.rendering = false;

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 19, 22, 25]]);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "clear",
    value: function clear(options) {
      var _this = this;

      if (this.inited) {
        this.engine.clear(options);
      } else {
        this.pendings.unshift(function () {
          _this.engine.clear(options);

          _this.pendings.shift();
        });
      }

      return this;
    } // public setScissor(
    //   scissor: Partial<{
    //     enable: boolean;
    //     box: {
    //       x: number;
    //       y: number;
    //       width: number;
    //       height: number;
    //     };
    //   }>,
    // ) {
    //   this.engine.setScissor(scissor);
    //   return this;
    // }

  }, {
    key: "setSize",
    value: function setSize(_ref) {
      var width = _ref.width,
          height = _ref.height;
      var canvas = this.engine.getCanvas();
      this.size = {
        width: width,
        height: height
      };
      canvas.width = width;
      canvas.height = height;
      return this;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.size;
    }
  }]);
  return Renderer;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "shaderModule", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "configService", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map