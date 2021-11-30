"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _uniform = require("../utils/uniform");

var _constants2 = require("./constants");

var _WebGPUBuffer = _interopRequireDefault(require("./WebGPUBuffer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// @ts-ignore
function concatenate(resultConstructor) {
  var totalLength = 0;

  for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _arrays = arrays; _i < _arrays.length; _i++) {
    var arr = _arrays[_i];
    totalLength += arr.length;
  }

  var result = new resultConstructor(totalLength);
  var offset = 0;

  for (var _i2 = 0, _arrays2 = arrays; _i2 < _arrays2.length; _i2++) {
    var _arr = _arrays2[_i2];
    result.set(_arr, offset);
    offset += _arr.length;
  }

  return result;
}

var WebGPUModel = /*#__PURE__*/function () {
  /**
   * 用于后续渲染时动态更新
   */

  /**
   * vertex
   */

  /**
   * indices's buffer
   */
  function WebGPUModel(engine, options) {
    (0, _classCallCheck2.default)(this, WebGPUModel);
    this.engine = engine;
    this.options = options;
    this.pipelineLayout = void 0;
    this.renderPipeline = void 0;
    this.uniformsBindGroupLayout = void 0;
    this.uniformBindGroup = void 0;
    this.uniformBuffer = void 0;
    this.uniforms = {};
    this.uniformGPUBufferLayout = [];
    this.attributeCache = {};
    this.indexBuffer = void 0;
    this.indexCount = void 0;
  }

  (0, _createClass2.default)(WebGPUModel, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        var _this$options, vs, fs, attributes, uniforms, primitive, count, elements, depth, blend, stencil, cull, instances, _yield$this$compilePi, vertexStage, fragmentStage, vertexState, descriptor;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$options = this.options, vs = _this$options.vs, fs = _this$options.fs, attributes = _this$options.attributes, uniforms = _this$options.uniforms, primitive = _this$options.primitive, count = _this$options.count, elements = _this$options.elements, depth = _this$options.depth, blend = _this$options.blend, stencil = _this$options.stencil, cull = _this$options.cull, instances = _this$options.instances; // build shaders first

                _context.next = 3;
                return this.compilePipelineStageDescriptor(vs, fs, null);

              case 3:
                _yield$this$compilePi = _context.sent;
                vertexStage = _yield$this$compilePi.vertexStage;
                fragmentStage = _yield$this$compilePi.fragmentStage;

                if (uniforms) {
                  // create uniform bind groups & layout
                  this.buildUniformBindGroup(uniforms);
                }

                if (elements) {
                  this.indexBuffer = elements.get();
                  this.indexCount = elements.indexCount;
                } // TODO: instanced array


                vertexState = {
                  vertexBuffers: Object.keys(attributes).map(function (attributeName, i) {
                    var attribute = attributes[attributeName];

                    var _attribute$get = attribute.get(),
                        arrayStride = _attribute$get.arrayStride,
                        stepMode = _attribute$get.stepMode,
                        ats = _attribute$get.attributes;

                    _this.attributeCache[attributeName] = attribute;
                    return {
                      arrayStride: arrayStride,
                      stepMode: stepMode,
                      attributes: ats
                    };
                  })
                };
                descriptor = {
                  sampleCount: this.engine.mainPassSampleCount,
                  primitiveTopology: _constants2.primitiveMap[primitive || _gWebgpuCore.gl.TRIANGLES],
                  rasterizationState: _objectSpread(_objectSpread({}, this.getDefaultRasterizationStateDescriptor()), {}, {
                    // TODO: support frontface
                    cullMode: (0, _constants2.getCullMode)({
                      cull: cull
                    })
                  }),
                  depthStencilState: (0, _constants2.getDepthStencilStateDescriptor)({
                    depth: depth,
                    stencil: stencil
                  }),
                  colorStates: (0, _constants2.getColorStateDescriptors)({
                    blend: blend
                  }, this.engine.options.swapChainFormat),
                  layout: this.pipelineLayout,
                  vertexStage: vertexStage,
                  fragmentStage: fragmentStage,
                  vertexState: vertexState
                }; // create pipeline

                this.renderPipeline = this.engine.device.createRenderPipeline(descriptor);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "addUniforms",
    value: function addUniforms(uniforms) {
      this.uniforms = _objectSpread(_objectSpread({}, this.uniforms), (0, _uniform.extractUniforms)(uniforms));
    }
  }, {
    key: "draw",
    value: function draw(options) {
      var _this2 = this;

      var renderPass = this.engine.getCurrentRenderPass();

      var uniforms = _objectSpread(_objectSpread({}, this.uniforms), (0, _uniform.extractUniforms)(options.uniforms || {}));

      var bindGroupBindings = []; // TODO: uniform 发生修改

      Object.keys(uniforms).forEach(function (uniformName) {
        var type = (0, _typeof2.default)(uniforms[uniformName]);

        if (type === 'boolean' || type === 'number' || Array.isArray(uniforms[uniformName]) || // @ts-ignore
        uniforms[uniformName].BYTES_PER_ELEMENT) {
          var _this2$uniformGPUBuff;

          var offset = (_this2$uniformGPUBuff = _this2.uniformGPUBufferLayout.find(function (_ref) {
            var name = _ref.name;
            return name === uniformName;
          })) === null || _this2$uniformGPUBuff === void 0 ? void 0 : _this2$uniformGPUBuff.offset;

          if (offset !== null) {
            _this2.uniformBuffer.subData({
              // @ts-ignore
              data: uniforms[uniformName],
              // @ts-ignore
              offset: offset
            });
          }
        } else {
          var _this2$uniformGPUBuff2;

          var _offset = (_this2$uniformGPUBuff2 = _this2.uniformGPUBufferLayout.find(function (_ref2) {
            var name = _ref2.name;
            return name === uniformName;
          })) === null || _this2$uniformGPUBuff2 === void 0 ? void 0 : _this2$uniformGPUBuff2.offset;

          if (_offset !== null) {
            var textureOrFramebuffer = uniforms[uniformName].get();

            var _ref3 = // @ts-ignore
            textureOrFramebuffer.color || textureOrFramebuffer,
                texture = _ref3.texture,
                sampler = _ref3.sampler;

            if (sampler) {
              bindGroupBindings.push({
                // @ts-ignore
                binding: _offset,
                resource: sampler
              }); // @ts-ignore

              _offset++;
            }

            bindGroupBindings.push({
              // @ts-ignore
              binding: _offset,
              resource: texture.createView()
            });
          }
        }
      });

      if (this.uniformBuffer) {
        bindGroupBindings[0] = {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer.get() // 返回 GPUBuffer 原生对象

          }
        };
      }

      this.uniformBindGroup = this.engine.device.createBindGroup({
        layout: this.uniformsBindGroupLayout,
        entries: bindGroupBindings
      });

      if (this.renderPipeline) {
        renderPass.setPipeline(this.renderPipeline);
      }

      renderPass.setBindGroup(0, this.uniformBindGroup);

      if (this.indexBuffer) {
        renderPass.setIndexBuffer(this.indexBuffer.get(), WebGPUConstants.IndexFormat.Uint32, 0);
      }

      Object.keys(this.attributeCache).forEach(function (attributeName, i) {
        renderPass.setVertexBuffer(0 + i, _this2.attributeCache[attributeName].get().buffer, 0);
      }); // renderPass.draw(verticesCount, instancesCount, verticesStart, 0);

      if (this.indexBuffer) {
        renderPass.drawIndexed(this.indexCount, this.options.instances || 1, 0, 0, 0);
      } else {
        renderPass.draw(this.options.count || 0, this.options.instances || 0, 0, 0);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "compilePipelineStageDescriptor",
    value: function () {
      var _compilePipelineStageDescriptor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(vertexCode, fragmentCode, defines) {
        var shaderVersion, vertexShader, fragmentShader;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                shaderVersion = '#version 450\n';
                vertexShader = vertexCode;
                fragmentShader = fragmentCode;

                if (this.engine.options.useWGSL) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return this.compileShaderToSpirV(vertexCode, 'vertex', shaderVersion);

              case 6:
                vertexShader = _context2.sent;
                _context2.next = 9;
                return this.compileShaderToSpirV(fragmentCode, 'fragment', shaderVersion);

              case 9:
                fragmentShader = _context2.sent;

              case 10:
                return _context2.abrupt("return", this.createPipelineStageDescriptor(vertexShader, fragmentShader));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function compilePipelineStageDescriptor(_x, _x2, _x3) {
        return _compilePipelineStageDescriptor.apply(this, arguments);
      }

      return compilePipelineStageDescriptor;
    }()
  }, {
    key: "compileShaderToSpirV",
    value: function compileShaderToSpirV(source, type, shaderVersion) {
      return this.compileRawShaderToSpirV(shaderVersion + source, type);
    }
  }, {
    key: "compileRawShaderToSpirV",
    value: function compileRawShaderToSpirV(source, type) {
      return this.engine.glslang.compileGLSL(source, type);
    }
  }, {
    key: "createPipelineStageDescriptor",
    value: function createPipelineStageDescriptor(vertexShader, fragmentShader) {
      return {
        vertexStage: {
          module: this.engine.device.createShaderModule({
            code: vertexShader,
            // @ts-ignore
            isWHLSL: _gWebgpuCore.isSafari
          }),
          entryPoint: 'main'
        },
        fragmentStage: {
          module: this.engine.device.createShaderModule({
            code: fragmentShader,
            // @ts-ignore
            isWHLSL: _gWebgpuCore.isSafari
          }),
          entryPoint: 'main'
        }
      };
    }
    /**
     * @see https://gpuweb.github.io/gpuweb/#rasterization-state
     */

  }, {
    key: "getDefaultRasterizationStateDescriptor",
    value: function getDefaultRasterizationStateDescriptor() {
      return {
        frontFace: WebGPUConstants.FrontFace.CCW,
        cullMode: WebGPUConstants.CullMode.None,
        depthBias: 0,
        depthBiasSlopeScale: 0,
        depthBiasClamp: 0
      };
    }
  }, {
    key: "buildUniformBindGroup",
    value: function buildUniformBindGroup(uniforms) {
      var _this3 = this;

      var offset = 0; // FIXME: 所有 uniform 合并成一个 buffer，固定使用 Float32Array 存储，确实会造成一些内存的浪费

      var mergedUniformData = concatenate.apply(void 0, [Float32Array].concat((0, _toConsumableArray2.default)(Object.keys(uniforms).map(function (uniformName) {
        if (uniforms[uniformName]) {
          _this3.uniformGPUBufferLayout.push({
            name: uniformName,
            offset: offset
          }); // @ts-ignore


          offset += (uniforms[uniformName].length || 1) * 4;
          return uniforms[uniformName];
        } else {
          // texture & framebuffer
          return [];
        }
      }))));
      var entries = [];
      var hasUniform = false;

      if (mergedUniformData.length) {
        hasUniform = true; // TODO: 所有 uniform 绑定到 slot 0，通过解析 Shader 代码判定可见性

        entries.push({
          // TODO: 暂时都绑定到 slot 0
          binding: 0,
          visibility: WebGPUConstants.ShaderStage.Fragment | WebGPUConstants.ShaderStage.Vertex,
          // TODO: 暂时 VS 和 FS 都可见
          type: WebGPUConstants.BindingType.UniformBuffer
        });
      } // 声明 texture & sampler


      Object.keys(uniforms).filter(function (uniformName) {
        return uniforms[uniformName] === null;
      }).forEach(function (uniformName, i) {
        _this3.uniformGPUBufferLayout.push({
          name: uniformName,
          offset: i * 2 + (hasUniform ? 1 : 0)
        });

        entries.push({
          // Sampler
          binding: i * 2 + (hasUniform ? 1 : 0),
          visibility: WebGPUConstants.ShaderStage.Fragment,
          type: WebGPUConstants.BindingType.Sampler
        }, {
          // Texture view
          binding: i * 2 + (hasUniform ? 1 : 0) + 1,
          visibility: WebGPUConstants.ShaderStage.Fragment,
          type: WebGPUConstants.BindingType.SampledTexture
        });
      });
      this.uniformsBindGroupLayout = this.engine.device.createBindGroupLayout({
        // 最新 API 0.0.22 版本使用 entries。Chrome Canary 84.0.4110.0 已实现。
        // 使用 bindings 会报 Warning: GPUBindGroupLayoutDescriptor.bindings is deprecated: renamed to entries
        // @see https://github.com/antvis/GWebGPUEngine/issues/5
        entries: entries
      });
      this.pipelineLayout = this.engine.device.createPipelineLayout({
        bindGroupLayouts: [this.uniformsBindGroupLayout]
      });

      if (hasUniform) {
        this.uniformBuffer = new _WebGPUBuffer.default(this.engine, {
          // TODO: 处理 Struct 和 boolean
          // @ts-ignore
          data: mergedUniformData instanceof Array ? // @ts-ignore
          new Float32Array(mergedUniformData) : mergedUniformData,
          usage: WebGPUConstants.BufferUsage.Uniform | WebGPUConstants.BufferUsage.CopyDst
        });
      }
    }
  }]);
  return WebGPUModel;
}();

exports.default = WebGPUModel;
//# sourceMappingURL=WebGPUModel.js.map