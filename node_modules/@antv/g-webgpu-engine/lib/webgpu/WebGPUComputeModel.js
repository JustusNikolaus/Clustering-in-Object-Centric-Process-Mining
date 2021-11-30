"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _isNumber = require("../utils/is-number");

var _WebGPUBuffer = _interopRequireDefault(require("./WebGPUBuffer"));

var WebGPUComputeModel = /*#__PURE__*/function () {
  /**
   * 用于后续渲染时动态更新
   */
  function WebGPUComputeModel(engine, context) {
    (0, _classCallCheck2.default)(this, WebGPUComputeModel);
    this.engine = engine;
    this.context = context;
    this.entity = (0, _gWebgpuCore.createEntity)();
    this.uniformGPUBufferLayout = [];
    this.uniformBuffer = void 0;
    this.vertexBuffers = {};
    this.outputBuffer = void 0;
    this.bindGroupEntries = void 0;
    this.bindGroup = void 0;
    this.computePipeline = void 0;
  }

  (0, _createClass2.default)(WebGPUComputeModel, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;

        var _yield$this$compileCo, computeStage, buffers, uniforms, bufferBindingIndex, offset, mergedUniformData;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.compileComputePipelineStageDescriptor(this.context.shader);

              case 2:
                _yield$this$compileCo = _context.sent;
                computeStage = _yield$this$compileCo.computeStage;
                buffers = this.context.uniforms.filter(function (uniform) {
                  return uniform.storageClass === _gWebgpuCore.STORAGE_CLASS.StorageBuffer;
                });
                uniforms = this.context.uniforms.filter(function (uniform) {
                  return uniform.storageClass === _gWebgpuCore.STORAGE_CLASS.Uniform;
                });
                bufferBindingIndex = uniforms.length ? 1 : 0;
                this.bindGroupEntries = [];

                if (bufferBindingIndex) {
                  offset = 0; // FIXME: 所有 uniform 合并成一个 buffer，固定使用 Float32Array 存储，确实会造成一些内存的浪费
                  // we use std140 layout @see https://www.khronos.org/opengl/wiki/Interface_Block_(GLSL)

                  mergedUniformData = [];
                  uniforms.forEach(function (uniform) {
                    if ((0, _isNumber.isNumber)(uniform.data)) {
                      _this.uniformGPUBufferLayout.push({
                        name: uniform.name,
                        offset: offset
                      });

                      offset += 4; // @ts-ignore

                      mergedUniformData.push(uniform.data);
                    } else {
                      var _uniform$data;

                      // @ts-ignore
                      var originDataLength = ((_uniform$data = uniform.data) === null || _uniform$data === void 0 ? void 0 : _uniform$data.length) || 1;

                      if (originDataLength === 3) {
                        // vec3 -> vec4
                        // @see http://ptgmedia.pearsoncmg.com/images/9780321552624/downloads/0321552628_AppL.pdf
                        originDataLength = 4; // @ts-ignore

                        uniform.data.push(0);
                      } // 4 elements per block/line


                      var padding = offset / 4 % 4;

                      if (padding > 0) {
                        var space = 4 - padding;

                        if (originDataLength > 1 && originDataLength <= space) {
                          if (originDataLength === 2) {
                            if (space === 3) {
                              offset += 4;
                              mergedUniformData.push(0);
                            } // @ts-ignore


                            mergedUniformData.push.apply(mergedUniformData, (0, _toConsumableArray2.default)(uniform.data));

                            _this.uniformGPUBufferLayout.push({
                              name: uniform.name,
                              offset: offset
                            });
                          }
                        } else {
                          for (var i = 0; i < space; i++) {
                            offset += 4;
                            mergedUniformData.push(0);
                          } // @ts-ignore


                          mergedUniformData.push.apply(mergedUniformData, (0, _toConsumableArray2.default)(uniform.data));

                          _this.uniformGPUBufferLayout.push({
                            name: uniform.name,
                            offset: offset
                          });
                        }
                      }

                      offset += 4 * originDataLength;
                    }
                  });
                  this.uniformBuffer = new _WebGPUBuffer.default(this.engine, {
                    // TODO: 处理 Struct 和 boolean
                    // @ts-ignore
                    data: mergedUniformData instanceof Array ? // @ts-ignore
                    new Float32Array(mergedUniformData) : mergedUniformData,
                    usage: WebGPUConstants.BufferUsage.Uniform | WebGPUConstants.BufferUsage.CopyDst
                  });
                  this.bindGroupEntries.push({
                    binding: 0,
                    resource: {
                      buffer: this.uniformBuffer.get()
                    }
                  });
                } // create GPUBuffers for storeage buffers


                buffers.forEach(function (buffer) {
                  if (buffer.data !== null) {
                    if (buffer.type === _gWebgpuCore.AST_TOKEN_TYPES.Vector4FloatArray || buffer.type === _gWebgpuCore.AST_TOKEN_TYPES.FloatArray) {
                      var gpuBuffer;

                      if (buffer.name === _this.context.output.name) {
                        gpuBuffer = new _WebGPUBuffer.default(_this.engine, {
                          // @ts-ignore
                          data: isFinite(Number(buffer.data)) ? [buffer.data] : buffer.data,
                          usage: WebGPUConstants.BufferUsage.Storage | WebGPUConstants.BufferUsage.CopyDst | WebGPUConstants.BufferUsage.CopySrc
                        });
                        _this.outputBuffer = gpuBuffer;
                        _this.context.output = {
                          name: buffer.name,
                          // @ts-ignore
                          length: isFinite(Number(buffer.data)) ? 1 : buffer.data.length,
                          typedArrayConstructor: Float32Array,
                          gpuBuffer: gpuBuffer.get()
                        };
                      } else {
                        if (buffer.isReferer) {
                          // @ts-ignore
                          if (buffer.data.model && buffer.data.model.outputBuffer) {
                            // @ts-ignore
                            gpuBuffer = buffer.data.model.outputBuffer;
                          } else {// referred kernel haven't been executed
                          }
                        } else {
                          gpuBuffer = new _WebGPUBuffer.default(_this.engine, {
                            // @ts-ignore
                            data: isFinite(Number(buffer.data)) ? [buffer.data] : buffer.data,
                            usage: WebGPUConstants.BufferUsage.Storage | WebGPUConstants.BufferUsage.CopyDst | WebGPUConstants.BufferUsage.CopySrc
                          });
                        }
                      } // @ts-ignore


                      _this.vertexBuffers[buffer.name] = gpuBuffer;

                      _this.bindGroupEntries.push({
                        binding: bufferBindingIndex,
                        resource: {
                          name: buffer.name,
                          refer: gpuBuffer ? undefined : buffer.data,
                          // @ts-ignore
                          buffer: gpuBuffer ? gpuBuffer.get() : undefined
                        }
                      });

                      bufferBindingIndex++;
                    }
                  }
                }); // create compute pipeline layout

                this.computePipeline = this.engine.device.createComputePipeline({
                  computeStage: computeStage
                });
                console.log(this.bindGroupEntries);
                this.bindGroup = this.engine.device.createBindGroup({
                  layout: this.computePipeline.getBindGroupLayout(0),
                  entries: this.bindGroupEntries
                });

              case 13:
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
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (this.uniformBuffer) {
        this.uniformBuffer.destroy();
      }

      Object.keys(this.vertexBuffers).forEach(function (bufferName) {
        return _this2.vertexBuffers[bufferName].destroy();
      });
    }
  }, {
    key: "readData",
    value: function () {
      var _readData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var output, length, typedArrayConstructor, gpuBuffer, byteCount, gpuReadBuffer, encoder, queue, arraybuffer, typedArray;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                output = this.context.output;

                if (!output) {
                  _context2.next = 16;
                  break;
                }

                length = output.length, typedArrayConstructor = output.typedArrayConstructor, gpuBuffer = output.gpuBuffer;

                if (!gpuBuffer) {
                  _context2.next = 16;
                  break;
                }

                // await gpuBuffer.mapAsync(WebGPUConstants.MapMode.Read);
                // const arraybuffer = gpuBuffer.getMappedRange();
                // let arraybuffer;
                // if (isSafari) {
                //   arraybuffer = await gpuBuffer.mapReadAsync();
                // } else {
                byteCount = length * typedArrayConstructor.BYTES_PER_ELEMENT; // @see https://developers.google.com/web/updates/2019/08/get-started-with-gpu-compute-on-the-web

                gpuReadBuffer = this.engine.device.createBuffer({
                  size: byteCount,
                  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
                });
                encoder = this.engine.device.createCommandEncoder();
                encoder.copyBufferToBuffer(gpuBuffer, 0, gpuReadBuffer, 0, byteCount);
                queue = _gWebgpuCore.isSafari ? // @ts-ignore
                this.engine.device.getQueue() : this.engine.device.defaultQueue;
                queue.submit([encoder.finish()]);
                _context2.next = 12;
                return gpuReadBuffer.mapAsync(WebGPUConstants.MapMode.Read);

              case 12:
                arraybuffer = gpuReadBuffer.getMappedRange();
                typedArray = new typedArrayConstructor(arraybuffer.slice(0));
                gpuReadBuffer.unmap();
                return _context2.abrupt("return", typedArray);

              case 16:
                return _context2.abrupt("return", new Float32Array());

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function readData() {
        return _readData.apply(this, arguments);
      }

      return readData;
    }()
  }, {
    key: "run",
    value: function run() {
      if (this.engine.currentComputePass) {
        var _this$engine$currentC;

        this.engine.currentComputePass.setPipeline(this.computePipeline); // this.bindGroupEntries.forEach((entry) => {
        //   if (!entry.resource.buffer) {
        //     // get referred kernel's output
        //     const gpuBuffer = (entry.resource.refer.model as WebGPUComputeModel)
        //       .outputBuffer;
        //     this.vertexBuffers[entry.resource.name] = gpuBuffer;
        //     entry.resource.buffer = gpuBuffer.get();
        //   }
        // });
        // const bindGroup = this.engine.device.createBindGroup({
        //   layout: this.computePipeline.getBindGroupLayout(0),
        //   entries: this.bindGroupEntries,
        // });

        this.engine.currentComputePass.setBindGroup(0, this.bindGroup);

        (_this$engine$currentC = this.engine.currentComputePass).dispatch.apply(_this$engine$currentC, (0, _toConsumableArray2.default)(this.context.dispatch));
      }
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(bufferName, data) {
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var buffer = this.vertexBuffers[bufferName];

      if (buffer) {
        buffer.subData({
          data: data,
          offset: offset
        });
      }
    }
  }, {
    key: "updateUniform",
    value: function updateUniform(uniformName, data) {
      var layout = this.uniformGPUBufferLayout.find(function (l) {
        return l.name === uniformName;
      });

      if (layout) {
        this.uniformBuffer.subData({
          data: Number.isFinite(data) ? new Float32Array([data]) : new Float32Array(data),
          offset: layout.offset
        });
      }
    }
  }, {
    key: "confirmInput",
    value: function confirmInput(model, inputName) {
      // copy output GPUBuffer of kernel
      var inputBuffer = this.vertexBuffers[inputName];
      var outputBuffer = model.outputBuffer;

      if (inputBuffer && outputBuffer && inputBuffer !== outputBuffer) {
        var encoder = this.engine.device.createCommandEncoder();
        var _context$output = model.context.output,
            length = _context$output.length,
            typedArrayConstructor = _context$output.typedArrayConstructor;
        var byteCount = length * typedArrayConstructor.BYTES_PER_ELEMENT;
        encoder.copyBufferToBuffer(outputBuffer.get(), 0, inputBuffer.get(), 0, byteCount);
        var queue = _gWebgpuCore.isSafari ? // @ts-ignore
        this.engine.device.getQueue() : this.engine.device.defaultQueue;
        queue.submit([encoder.finish()]);
      }
    }
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
    key: "compileComputePipelineStageDescriptor",
    value: function () {
      var _compileComputePipelineStageDescriptor = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(computeCode) {
        var computeShader, shaderVersion;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                computeShader = computeCode;
                shaderVersion = '#version 450\n';

                if (this.engine.options.useWGSL) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 5;
                return this.compileShaderToSpirV(computeCode, 'compute', shaderVersion);

              case 5:
                computeShader = _context3.sent;

              case 6:
                return _context3.abrupt("return", {
                  computeStage: {
                    module: this.engine.device.createShaderModule({
                      code: computeShader,
                      // @ts-ignore
                      isWHLSL: _gWebgpuCore.isSafari
                    }),
                    entryPoint: 'main'
                  }
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function compileComputePipelineStageDescriptor(_x) {
        return _compileComputePipelineStageDescriptor.apply(this, arguments);
      }

      return compileComputePipelineStageDescriptor;
    }()
  }]);
  return WebGPUComputeModel;
}();

exports.default = WebGPUComputeModel;
//# sourceMappingURL=WebGPUComputeModel.js.map