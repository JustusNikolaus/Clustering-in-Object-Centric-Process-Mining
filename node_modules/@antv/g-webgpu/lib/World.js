"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _gWebgpuCore = require("@antv/g-webgpu-core");

var _gWebgpuEngine = require("@antv/g-webgpu-engine");

var WebGPUConstants = _interopRequireWildcard(require("@webgpu/types/dist/constants"));

var _inversify = require("inversify");

var _Camera = require("./camera/Camera");

var _geometry = require("./geometry");

var _Box = require("./geometry/Box");

var _Merged = require("./geometry/Merged");

var _Plane = require("./geometry/Plane");

var _Sphere = require("./geometry/Sphere");

var _Kernel = require("./Kernel");

var _material = require("./material");

var _basic = require("./material/basic");

var _grid = require("./renderable/grid");

var _line = require("./renderable/line");

var _point = require("./renderable/point");

var _Renderable = require("./renderable/Renderable");

var _Renderer = require("./Renderer");

var _Scene = require("./Scene");

var _Cache = require("./texture/Cache");

var _Texture2D = require("./texture/Texture2D");

var _canvas = require("./utils/canvas");

var _View = require("./View");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var World = (_dec = (0, _inversify.injectable)(), _dec2 = (0, _inversify.inject)(_gWebgpuCore.IDENTIFIER.ConfigService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function World() {
    (0, _classCallCheck2.default)(this, World);
    (0, _initializerDefineProperty2.default)(this, "configService", _descriptor, this);
    this.container = void 0;
  }

  (0, _createClass2.default)(World, [{
    key: "getEngine",
    value: function () {
      var _getEngine = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var engine, _this$configService$g, canvas, engineOptions;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                engine = this.container.get(_gWebgpuCore.IDENTIFIER.RenderEngine);
                _this$configService$g = this.configService.get(), canvas = _this$configService$g.canvas, engineOptions = _this$configService$g.engineOptions;
                _context.next = 4;
                return engine.init(_objectSpread({
                  canvas: canvas || (0, _canvas.createCanvas)(),
                  swapChainFormat: WebGPUConstants.TextureFormat.BGRA8Unorm,
                  antialiasing: false
                }, engineOptions));

              case 4:
                return _context.abrupt("return", engine);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEngine() {
        return _getEngine.apply(this, arguments);
      }

      return getEngine;
    }()
    /**
     * get transform component
     * @param entity
     */

  }, {
    key: "getTransformComponent",
    value: function getTransformComponent(entity) {
      var manager = this.container.get(_gWebgpuCore.IDENTIFIER.TransformComponentManager);
      return manager.getComponentByEntity(entity);
    }
  }, {
    key: "getMeshComponent",
    value: function getMeshComponent(entity) {
      var manager = this.container.get(_gWebgpuCore.IDENTIFIER.MeshComponentManager);
      return manager.getComponentByEntity(entity);
    }
  }, {
    key: "setConfig",
    value: function setConfig(config) {
      this.configService.set(config);
    }
  }, {
    key: "setContainer",
    value: function setContainer(container) {
      this.container = container;
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      return (0, _gWebgpuCore.createEntity)();
    }
  }, {
    key: "createScene",
    value: function createScene() {
      return this.container.get(_Scene.Scene);
    }
  }, {
    key: "createCamera",
    value: function createCamera() {
      return this.container.get(_Camera.Camera);
    }
  }, {
    key: "createView",
    value: function createView() {
      return this.container.get(_View.View);
    } // public createLight(type: string,) {
    //   return this.container.getNamed(IDENTIFIER.Light, type)
    // }

  }, {
    key: "createRenderable",
    value: function createRenderable(type, config) {
      var renderable = type ? this.container.getNamed(_gWebgpuCore.IDENTIFIER.Renderable, type) : this.container.get(_Renderable.Renderable);
      var entity = (0, _gWebgpuCore.createEntity)();
      renderable.setConfig(config || {});
      renderable.setEntity(entity);
      return renderable;
    }
  }, {
    key: "createGeometry",
    value: function createGeometry(type, config) {
      var geometry = this.container.getNamed(_gWebgpuCore.IDENTIFIER.Geometry, type);
      var entity = (0, _gWebgpuCore.createEntity)();
      geometry.setConfig(config || {});
      geometry.setEntity(entity);
      return geometry.getComponent();
    }
  }, {
    key: "createMaterial",
    value: function createMaterial(type, config) {
      var material = this.container.getNamed(_gWebgpuCore.IDENTIFIER.Material, type);
      var entity = (0, _gWebgpuCore.createEntity)();
      material.setConfig(config || {});
      material.setEntity(entity, type);
      return material.getComponent();
    }
  }, {
    key: "createTexture2D",
    value: function createTexture2D(config) {
      var texture = this.container.get(_Texture2D.Texture2D);
      texture.setConfig(config);
      return texture;
    }
  }, {
    key: "createBufferGeometry",
    value: function createBufferGeometry(params) {
      var geometrySystem = this.container.getNamed(_gWebgpuCore.IDENTIFIER.Systems, _gWebgpuCore.IDENTIFIER.GeometrySystem);
      return geometrySystem.createBufferGeometry(params);
    }
  }, {
    key: "createInstancedBufferGeometry",
    value: function createInstancedBufferGeometry(params) {
      var geometrySystem = this.container.getNamed(_gWebgpuCore.IDENTIFIER.Systems, _gWebgpuCore.IDENTIFIER.GeometrySystem);
      return geometrySystem.createInstancedBufferGeometry(params);
    }
  }, {
    key: "createShaderMaterial",
    value: function createShaderMaterial(params) {
      var materialSystem = this.container.getNamed(_gWebgpuCore.IDENTIFIER.Systems, _gWebgpuCore.IDENTIFIER.MaterialSystem);
      return materialSystem.createShaderMaterial(params);
    }
  }, {
    key: "createKernel",
    value: function createKernel(precompiledBundle) {
      var kernel = this.container.get(_Kernel.Kernel);

      if (typeof precompiledBundle === 'string') {
        kernel.setBundle(JSON.parse(precompiledBundle));
      } else {
        kernel.setBundle(precompiledBundle);
      }

      kernel.init();
      return kernel;
    }
  }, {
    key: "createRenderer",
    value: function createRenderer() {
      var renderer = this.container.get(_Renderer.Renderer);
      renderer.container = this.container;
      renderer.init();
      return renderer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var systems = this.container.getAll(_gWebgpuCore.IDENTIFIER.Systems);
      systems.forEach(function (system) {
        if (system.tearDown) {
          system.tearDown();
        }
      });
      var engine = this.container.get(_gWebgpuCore.IDENTIFIER.RenderEngine);
      engine.destroy();
      var interactor = this.container.get(_gWebgpuCore.IDENTIFIER.InteractorService);
      interactor.destroy();
    }
  }], [{
    key: "create",
    value: function create() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var worldContainer = (0, _gWebgpuCore.createWorldContainer)(); // bind render engine, fallback to WebGL

      var engineClazz = !navigator.gpu ? _gWebgpuEngine.WebGLEngine : _gWebgpuEngine.WebGPUEngine;

      if (!worldContainer.isBound(_gWebgpuCore.IDENTIFIER.RenderEngine)) {
        worldContainer.bind(_gWebgpuCore.IDENTIFIER.RenderEngine) // @ts-ignore
        .to(engineClazz).inSingletonScope();
      }

      worldContainer.bind(_Renderer.Renderer).toSelf();
      worldContainer.bind(_Kernel.Kernel).toSelf();
      worldContainer.bind(_Renderable.Renderable).toSelf();
      worldContainer.bind(_View.View).toSelf();
      worldContainer.bind(_Camera.Camera).toSelf();
      worldContainer.bind(_Scene.Scene).toSelf();
      worldContainer.bind(World).toSelf();
      worldContainer.bind(_Cache.TextureCache).toSelf();
      worldContainer.bind(_Texture2D.Texture2D).toSelf(); // bind geometries

      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Geometry).to(_Box.Box).whenTargetNamed(_geometry.Geometry.BOX);
      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Geometry).to(_Sphere.Sphere).whenTargetNamed(_geometry.Geometry.SPHERE);
      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Geometry).to(_Plane.Plane).whenTargetNamed(_geometry.Geometry.PLANE);
      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Geometry).to(_Merged.Merged).whenTargetNamed(_geometry.Geometry.MERGED); // bind materials

      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Material).to(_basic.Basic).whenTargetNamed(_material.Material.BASIC); // bind renderables

      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Renderable).to(_point.Point).whenTargetNamed(_Renderable.Renderable.POINT);
      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Renderable).to(_line.Line).whenTargetNamed(_Renderable.Renderable.LINE);
      worldContainer.bind(_gWebgpuCore.IDENTIFIER.Renderable).to(_grid.Grid).whenTargetNamed(_Renderable.Renderable.GRID);
      var world = worldContainer.get(World);
      world.setContainer(worldContainer);
      world.setConfig(config);
      return world;
    }
  }]);
  return World;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "configService", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.World = World;
//# sourceMappingURL=World.js.map