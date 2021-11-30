"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyPass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _inversify = require("inversify");

var _identifier = require("../../../identifier");

var _gl = require("../gl");

var _RenderPass = require("./RenderPass");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

/* babel-plugin-inline-import '../../../services/shader-module/shaders/webgl.copy.frag.glsl' */
var copyFrag = "varying vec2 v_UV;\n\nuniform sampler2D u_Texture;\n\nvoid main() {\n  gl_FragColor = vec4(texture2D(u_Texture, v_UV));\n}";

/* babel-plugin-inline-import '../../../services/shader-module/shaders/webgl.copy.vert.glsl' */
var copyVert = "attribute vec2 a_Position;\n\nvarying vec2 v_UV;\n\nvoid main() {\n  v_UV = 0.5 * (a_Position + 1.0);\n  gl_Position = vec4(a_Position, 0., 1.);\n}";

/* babel-plugin-inline-import '../../../services/shader-module/shaders/webgpu.copy.frag.glsl' */
var copyFragWebGPU = "layout(set = 0, binding = 0) uniform sampler u_TextureSampler;\nlayout(set = 0, binding = 1) uniform texture2D u_Texture;\n\nlayout(location = 0) in vec2 v_UV;\nlayout(location = 0) out vec4 outColor;\n\nvoid main() {\n  outColor = texture(sampler2D(u_Texture, u_TextureSampler), v_UV);\n}";

/* babel-plugin-inline-import '../../../services/shader-module/shaders/webgpu.copy.vert.glsl' */
var copyVertWebGPU = "layout(location = 0) in vec2 a_Position;\nlayout(location = 0) out vec2 v_UV;\n\nvoid main() {\n  v_UV = 0.5 * (a_Position + 1.0);\n  gl_Position = vec4(a_Position, 0., 1.);\n}";
var CopyPass = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderEngine), _dec3 = (0, _inversify.inject)(_identifier.IDENTIFIER.ResourcePool), _dec(_class = (_class2 = (_temp = _class3 = function CopyPass() {
  var _this = this;

  (0, _classCallCheck2.default)(this, CopyPass);
  (0, _initializerDefineProperty2.default)(this, "engine", _descriptor, this);
  (0, _initializerDefineProperty2.default)(this, "resourcePool", _descriptor2, this);
  this.model = void 0;

  this.setup = function (fg, passNode, pass) {
    var renderPass = fg.getPass(_RenderPass.RenderPass.IDENTIFIER);

    if (renderPass) {
      var output = fg.createRenderTarget(passNode, 'render to screen', {
        width: 1,
        height: 1
      });
      pass.data = {
        input: passNode.read(renderPass.data.output),
        output: passNode.write(fg, output)
      };
    }
  };

  this.execute = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(fg, pass) {
      var _this$engine, createModel, createAttribute, createBuffer, model, resourceNode, framebuffer;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$engine = _this.engine, createModel = _this$engine.createModel, createAttribute = _this$engine.createAttribute, createBuffer = _this$engine.createBuffer;

              if (_this.model) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return createModel({
                vs: _this.engine.supportWebGPU ? copyVertWebGPU : copyVert,
                fs: _this.engine.supportWebGPU ? copyFragWebGPU : copyFrag,
                attributes: {
                  // rendering a fullscreen triangle instead of quad
                  // @see https://www.saschawillems.de/blog/2016/08/13/vulkan-tutorial-on-rendering-a-fullscreen-quad-without-buffers/
                  a_Position: createAttribute({
                    buffer: createBuffer({
                      data: [-4, -4, 4, -4, 0, 4],
                      type: _gl.gl.FLOAT
                    }),
                    size: 2,
                    arrayStride: 2 * 4,
                    stepMode: 'vertex',
                    attributes: [{
                      shaderLocation: 0,
                      offset: 0,
                      format: 'float2'
                    }]
                  })
                },
                uniforms: {
                  // @ts-ignore
                  u_Texture: null
                },
                depth: {
                  enable: false
                },
                count: 3,
                blend: {
                  // copy pass 需要混合
                  // enable: this.getName() === 'copy',
                  enable: true
                }
              });

            case 4:
              model = _context.sent;
              _this.model = model;

            case 6:
              // 实例化资源
              resourceNode = fg.getResourceNode(pass.data.input);
              framebuffer = _this.resourcePool.getOrCreateResource(resourceNode.resource);

              _this.engine.useFramebuffer(null, function () {
                _this.engine.clear({
                  framebuffer: null,
                  color: [0, 0, 0, 0],
                  depth: 1,
                  stencil: 0
                });

                _this.model.draw({
                  uniforms: {
                    u_Texture: framebuffer // u_ViewportSize: [width, height],

                  }
                });
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.tearDown = function () {
    _this.model = undefined;
  };
}, _class3.IDENTIFIER = 'Copy Pass', _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "resourcePool", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.CopyPass = CopyPass;
//# sourceMappingURL=CopyPass.js.map