"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kernel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _inversify = require("inversify");

var _canvas = require("./utils/canvas");

var _isArray = _interopRequireDefault(require("./utils/is-array"));

var _isNumber = require("./utils/is-number");

var _isTypedarray = require("./utils/is-typedarray");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Kernel = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.RenderEngine), _dec3 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ConfigService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Kernel() {
    (0, _classCallCheck2.default)(this, Kernel);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "configService", _descriptor2, this);
    this.entity = (0, _gWebgpuCore.createEntity)();
    this.model = void 0;
    this.dirty = true;
    this.compiledBundle = void 0;
    this.initPromise = void 0;
  }

  (0, _createClass2.default)(Kernel, [{
    key: "init",
    value: function init() {
      var _this$configService$g = this.configService.get(),
          canvas = _this$configService$g.canvas,
          engineOptions = _this$configService$g.engineOptions;

      this.initPromise = this.engine.init(_objectSpread({
        canvas: canvas || (0, _canvas.createCanvas)(),
        swapChainFormat: WebGPUConstants.TextureFormat.BGRA8Unorm,
        antialiasing: false
      }, engineOptions));
    }
  }, {
    key: "setBundle",
    value: function setBundle(bundle) {
      // deep clone
      this.compiledBundle = JSON.parse(JSON.stringify(bundle));
    }
  }, {
    key: "setDispatch",
    value: function setDispatch(dispatch) {
      if (this.compiledBundle.context) {
        this.compiledBundle.context.dispatch = dispatch;
      }

      return this;
    }
  }, {
    key: "setMaxIteration",
    value: function setMaxIteration(maxIteration) {
      if (this.compiledBundle.context) {
        this.compiledBundle.context.maxIteration = maxIteration;
      }

      return this;
    }
  }, {
    key: "setBinding",
    value: function setBinding(name, data) {
      var _this = this;

      if (typeof name === 'string') {
        var isNumberLikeData = (0, _isNumber.isNumber)(data) || (0, _isTypedarray.isTypedArray)(data) || (0, _isArray.default)(data);

        if (this.compiledBundle && this.compiledBundle.context) {
          // set define, eg. setBinding('MAX_LENGTH', 10)
          var existedDefine = this.compiledBundle.context.defines.find(function (b) {
            return b.name === name;
          });

          if (existedDefine) {
            existedDefine.value = data;
            return this;
          } // set uniform


          var existedBinding = this.compiledBundle.context.uniforms.find(function (b) {
            return b.name === name;
          });

          if (existedBinding) {
            // update uniform or buffer
            if (isNumberLikeData) {
              // @ts-ignore
              existedBinding.data = data;
              existedBinding.isReferer = false;

              if (existedBinding.storageClass === _gWebgpuCore.STORAGE_CLASS.Uniform) {
                if (this.model) {
                  // @ts-ignore
                  this.model.updateUniform(name, data);
                }
              } else {
                if (this.model) {
                  // @ts-ignore
                  this.model.updateBuffer(name, data);
                }
              }
            } else {
              // update with another kernel
              existedBinding.isReferer = true; // @ts-ignore

              existedBinding.data = data;
            }
          }
        }
      } else {
        Object.keys(name).forEach(function (key) {
          _this.setBinding(key, name[key]);
        });
      }

      return this;
    }
  }, {
    key: "execute",
    value: function () {
      var _execute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this2 = this;

        var iteration,
            i,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                iteration = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;

                if (!this.dirty) {
                  _context.next = 6;
                  break;
                }

                if (this.compiledBundle.context) {
                  if (iteration > 1) {
                    this.compiledBundle.context.maxIteration = iteration;
                  } else {
                    this.compiledBundle.context.maxIteration++;
                  }
                }

                _context.next = 5;
                return this.compile();

              case 5:
                this.dirty = false;

              case 6:
                this.engine.beginFrame(); // 首先开启当前 frame 的 compute pass

                this.engine.clear({});

                if (this.compiledBundle.context) {
                  this.compiledBundle.context.uniforms.filter(function (_ref) {
                    var isReferer = _ref.isReferer;
                    return isReferer;
                  }).forEach(function (_ref2) {
                    var data = _ref2.data,
                        name = _ref2.name;

                    // @ts-ignore
                    _this2.model.confirmInput(data.model, name);
                  });
                }

                for (i = 0; i < iteration; i++) {
                  this.model.run();
                }

                this.engine.endFrame();
                return _context.abrupt("return", this);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
    /**
     * read output from GPUBuffer
     */

  }, {
    key: "getOutput",
    value: function () {
      var _getOutput = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.model.readData());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getOutput() {
        return _getOutput.apply(this, arguments);
      }

      return getOutput;
    }()
  }, {
    key: "compile",
    value: function () {
      var _compile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var context, target, shader;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.initPromise;

              case 2:
                context = _objectSpread({}, this.compiledBundle.context);
                target = this.engine.supportWebGPU ? this.engine.useWGSL ? _gWebgpuCore.Target.WGSL : _gWebgpuCore.Target.GLSL450 : _gWebgpuCore.Target.GLSL100;
                shader = this.compiledBundle.shaders[target]; // this.bindings?.forEach(({ name, data }) => {
                //   if (name === name.toUpperCase()) {
                //     const define = context.defines.find((d) => d.name === name);
                //     if (define) {
                //       // @ts-ignore
                //       define.value = data;
                //     }
                //   }
                // });
                // 生成运行时 define

                context.defines.filter(function (define) {
                  return define.runtime;
                }).forEach(function (define) {
                  var valuePlaceHolder = "".concat(_gWebgpuCore.DefineValuePlaceholder).concat(define.name);
                  shader = shader.replace(valuePlaceHolder, "".concat(define.value));
                });
                context.shader = shader; // 添加 uniform 绑定的数据

                context.uniforms.forEach(function (uniform) {
                  // const binding = this.bindings.find((b) => b.name === uniform.name);
                  // if (binding) {
                  //   // @ts-ignore
                  //   uniform.data = binding.referer || binding.data;
                  //   // @ts-ignore
                  //   uniform.isReferer = !!binding.referer;
                  // }
                  // 未指定数据，尝试根据 uniform 类型初始化
                  if (!uniform.data) {
                    if (uniform.storageClass === _gWebgpuCore.STORAGE_CLASS.StorageBuffer) {
                      var sizePerElement = 1;

                      if (uniform.type === _gWebgpuCore.AST_TOKEN_TYPES.FloatArray) {
                        sizePerElement = 1;
                      } else if (uniform.type === _gWebgpuCore.AST_TOKEN_TYPES.Vector4FloatArray) {
                        sizePerElement = 4;
                      }

                      uniform.data = new Float32Array(context.output.length * sizePerElement).fill(0);
                    }
                  }
                }); // } else if (uniform.type === 'image2D') {
                //   // @ts-ignore
                //   buffer.data = new Uint8ClampedArray(context.output.length!).fill(0);
                // }

                this.compiledBundle.context = context;
                _context3.next = 11;
                return this.engine.createComputeModel(this.compiledBundle.context);

              case 11:
                this.model = _context3.sent;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function compile() {
        return _compile.apply(this, arguments);
      }

      return compile;
    }()
  }]);
  return Kernel;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "configService", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Kernel = Kernel;
//# sourceMappingURL=Kernel.js.map