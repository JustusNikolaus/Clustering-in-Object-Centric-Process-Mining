"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderPass = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _glMatrix = require("gl-matrix");

var _inversify = require("inversify");

var _identifier = require("../../../identifier");

var _gl = require("../gl");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3, _temp;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var RenderPass = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_identifier.IDENTIFIER.MeshComponentManager), _dec3 = (0, _inversify.inject)(_identifier.IDENTIFIER.GeometryComponentManager), _dec4 = (0, _inversify.inject)(_identifier.IDENTIFIER.MaterialComponentManager), _dec5 = (0, _inversify.inject)(_identifier.IDENTIFIER.CullableComponentManager), _dec6 = (0, _inversify.inject)(_identifier.IDENTIFIER.TransformComponentManager), _dec7 = (0, _inversify.inject)(_identifier.IDENTIFIER.HierarchyComponentManager), _dec8 = (0, _inversify.inject)(_identifier.IDENTIFIER.Systems), _dec9 = (0, _inversify.named)(_identifier.IDENTIFIER.FrameGraphSystem), _dec10 = (0, _inversify.inject)(_identifier.IDENTIFIER.RenderEngine), _dec11 = (0, _inversify.inject)(_identifier.IDENTIFIER.ResourcePool), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function RenderPass() {
    var _this = this;

    (0, _classCallCheck2.default)(this, RenderPass);
    (0, _initializerDefineProperty2.default)(this, "mesh", _descriptor, this);
    (0, _initializerDefineProperty2.default)(this, "geometry", _descriptor2, this);
    (0, _initializerDefineProperty2.default)(this, "material", _descriptor3, this);
    (0, _initializerDefineProperty2.default)(this, "cullable", _descriptor4, this);
    (0, _initializerDefineProperty2.default)(this, "transform", _descriptor5, this);
    (0, _initializerDefineProperty2.default)(this, "hierarchy", _descriptor6, this);
    (0, _initializerDefineProperty2.default)(this, "frameGraphSystem", _descriptor7, this);
    (0, _initializerDefineProperty2.default)(this, "engine", _descriptor8, this);
    (0, _initializerDefineProperty2.default)(this, "resourcePool", _descriptor9, this);
    this.modelCache = {};

    this.setup = function (fg, passNode, pass) {
      var output = fg.createRenderTarget(passNode, 'color buffer', {
        width: 1,
        height: 1,
        usage: _gl.gl.RENDER_ATTACHMENT | _gl.gl.SAMPLED | _gl.gl.COPY_SRC
      });
      pass.data = {
        output: passNode.write(fg, output)
      };
    };

    this.execute = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(fg, pass, views) {
        var resourceNode, framebuffer, _iterator, _step, view, canvas;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                resourceNode = fg.getResourceNode(pass.data.output);
                framebuffer = _this.resourcePool.getOrCreateResource(resourceNode.resource); // initialize model of each mesh

                _iterator = _createForOfIteratorHelper(views);
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 11;
                  break;
                }

                view = _step.value;
                _context.next = 9;
                return _this.initView(view);

              case 9:
                _context.next = 5;
                break;

              case 11:
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](3);

                _iterator.e(_context.t0);

              case 16:
                _context.prev = 16;

                _iterator.f();

                return _context.finish(16);

              case 19:
                canvas = _this.engine.getCanvas();
                framebuffer.resize({
                  width: canvas.width,
                  height: canvas.height
                });

                _this.engine.setScissor({
                  enable: false
                });

                _this.engine.clear({
                  framebuffer: framebuffer,
                  color: views[0].getClearColor(),
                  // TODO: use clearColor defined in view
                  depth: 1
                });

                _this.engine.useFramebuffer(framebuffer, function () {
                  var _iterator2 = _createForOfIteratorHelper(views),
                      _step2;

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var view = _step2.value;

                      // must do rendering in a sync way
                      _this.renderView(view);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                });

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 13, 16, 19]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  (0, _createClass2.default)(RenderPass, [{
    key: "renderView",
    value: function renderView(view) {
      var scene = view.getScene();
      var camera = view.getCamera(); // get VP matrix from camera

      var viewMatrix = camera.getViewTransform();

      var viewProjectionMatrix = _glMatrix.mat4.multiply(_glMatrix.mat4.create(), camera.getPerspective(), viewMatrix); // TODO: use cached planes if camera was not changed


      camera.getFrustum().extractFromVPMatrix(viewProjectionMatrix);

      var _view$getViewport = view.getViewport(),
          x = _view$getViewport.x,
          y = _view$getViewport.y,
          width = _view$getViewport.width,
          height = _view$getViewport.height;

      this.engine.viewport({
        x: x,
        y: y,
        width: width,
        height: height
      }); // this.engine.setScissor({
      //   enable: true,
      //   box: { x, y, width, height },
      // });
      // this.engine.clear({
      //   // framebuffer,
      //   color: [1, 1, 1, 1], // TODO: use clearColor defined in view
      //   depth: 1,
      // });

      var _iterator3 = _createForOfIteratorHelper(scene.getEntities()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var meshEntity = _step3.value;
          this.renderMesh(meshEntity, {
            camera: camera,
            view: view,
            viewMatrix: viewMatrix
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "renderMesh",
    value: function renderMesh(meshEntity, _ref2) {
      var camera = _ref2.camera,
          view = _ref2.view,
          viewMatrix = _ref2.viewMatrix;
      var mesh = this.mesh.getComponentByEntity(meshEntity);

      if (!mesh || !mesh.visible) {
        return;
      } // filter meshes with frustum culling
      // if (!this.cullable.getComponentByEntity(meshEntity)?.visible) {
      //   return;
      // }


      var material = mesh.material;
      var geometry = mesh.geometry; // geometry 在自己的 System 中完成脏检查后的更新

      if (!geometry || geometry.dirty || !material) {
        return;
      } // get model matrix from mesh


      var transform = this.transform.getComponentByEntity(meshEntity);

      var modelViewMatrix = _glMatrix.mat4.multiply(_glMatrix.mat4.create(), viewMatrix, transform.worldTransform);

      var _view$getViewport2 = view.getViewport(),
          width = _view$getViewport2.width,
          height = _view$getViewport2.height; // set MVP matrix, other builtin uniforms @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram


      material.setUniform({
        projectionMatrix: camera.getPerspective(),
        modelViewMatrix: modelViewMatrix,
        modelMatrix: transform.worldTransform,
        viewMatrix: viewMatrix,
        cameraPosition: camera.getPosition(),
        u_viewport: [width, height]
      });

      if (mesh.model) {
        mesh.model.draw({
          uniforms: material.uniforms.reduce(function (cur, prev) {
            cur[prev.name] = prev.data;
            return cur;
          }, {})
        });
        material.uniforms.forEach(function (u) {
          u.dirty = false;
        });
        material.dirty = false;
      }
    }
  }, {
    key: "initMesh",
    value: function () {
      var _initMesh = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(meshEntity, view) {
        var mesh, material, geometry, modelCacheKey, _this$engine, createModel, createAttribute, modelInitializationOptions;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                mesh = this.mesh.getComponentByEntity(meshEntity);

                if (mesh) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                material = mesh.material;
                geometry = mesh.geometry;

                if (!(!geometry || geometry.dirty || !material)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                if (mesh.model) {
                  _context2.next = 24;
                  break;
                }

                modelCacheKey = "m-".concat(material.entity, "-g-").concat(geometry.entity);

                if (!this.modelCache[modelCacheKey]) {
                  _context2.next = 12;
                  break;
                }

                mesh.model = this.modelCache[modelCacheKey];
                return _context2.abrupt("return");

              case 12:
                material.setUniform({
                  projectionMatrix: 1,
                  modelViewMatrix: 1,
                  modelMatrix: 1,
                  viewMatrix: 1,
                  cameraPosition: 1,
                  u_viewport: 1
                });
                _this$engine = this.engine, createModel = _this$engine.createModel, createAttribute = _this$engine.createAttribute;
                modelInitializationOptions = {
                  vs: material.vertexShaderGLSL,
                  fs: material.fragmentShaderGLSL,
                  defines: material.defines,
                  attributes: geometry.attributes.reduce(function (cur, prev) {
                    if (prev.data && prev.buffer) {
                      cur[prev.name] = createAttribute({
                        buffer: prev.buffer,
                        attributes: prev.attributes,
                        arrayStride: prev.arrayStride,
                        stepMode: prev.stepMode,
                        divisor: prev.stepMode === 'vertex' ? 0 : 1
                      });
                    }

                    return cur;
                  }, {}),
                  uniforms: material.uniforms.reduce(function (cur, prev) {
                    cur[prev.name] = prev.data;
                    return cur;
                  }, {}),
                  scissor: {
                    enable: true,
                    // @ts-ignore
                    box: function box() {
                      return view.getViewport();
                    }
                  }
                };

                if (material.cull) {
                  modelInitializationOptions.cull = material.cull;
                }

                if (material.depth) {
                  modelInitializationOptions.depth = material.depth;
                }

                if (material.blend) {
                  modelInitializationOptions.blend = material.blend;
                }

                if (geometry.indicesBuffer) {
                  modelInitializationOptions.elements = geometry.indicesBuffer;
                }

                if (geometry.maxInstancedCount) {
                  modelInitializationOptions.instances = geometry.maxInstancedCount;
                  modelInitializationOptions.count = geometry.vertexCount || 3;
                }

                _context2.next = 22;
                return createModel(modelInitializationOptions);

              case 22:
                mesh.model = _context2.sent;
                this.modelCache[modelCacheKey] = mesh.model;

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initMesh(_x4, _x5) {
        return _initMesh.apply(this, arguments);
      }

      return initMesh;
    }()
  }, {
    key: "initView",
    value: function () {
      var _initView = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(view) {
        var scene, _iterator4, _step4, meshEntity;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                scene = view.getScene();
                _iterator4 = _createForOfIteratorHelper(scene.getEntities());
                _context3.prev = 2;

                _iterator4.s();

              case 4:
                if ((_step4 = _iterator4.n()).done) {
                  _context3.next = 10;
                  break;
                }

                meshEntity = _step4.value;
                _context3.next = 8;
                return this.initMesh(meshEntity, view);

              case 8:
                _context3.next = 4;
                break;

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](2);

                _iterator4.e(_context3.t0);

              case 15:
                _context3.prev = 15;

                _iterator4.f();

                return _context3.finish(15);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 12, 15, 18]]);
      }));

      function initView(_x6) {
        return _initView.apply(this, arguments);
      }

      return initView;
    }()
  }]);
  return RenderPass;
}(), _class3.IDENTIFIER = 'Render Pass', _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "mesh", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "geometry", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "material", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "cullable", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "transform", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "hierarchy", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "frameGraphSystem", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "engine", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "resourcePool", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.RenderPass = RenderPass;
//# sourceMappingURL=RenderPass.js.map