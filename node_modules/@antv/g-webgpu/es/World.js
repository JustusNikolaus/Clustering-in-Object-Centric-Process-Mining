import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/@webgpu/types/dist/index.d.ts" />
import { createEntity as _createEntity, createWorldContainer, IDENTIFIER } from '@antv/g-webgpu-core';
import { WebGLEngine, WebGPUEngine } from '@antv/g-webgpu-engine'; // tslint:disable-next-line:no-submodule-imports

import * as WebGPUConstants from '@webgpu/types/dist/constants';
import { inject, injectable } from 'inversify';
import { Camera } from './camera/Camera';
import { Geometry } from './geometry';
import { Box } from './geometry/Box';
import { Merged } from './geometry/Merged';
import { Plane } from './geometry/Plane';
import { Sphere } from './geometry/Sphere';
import { Kernel } from './Kernel';
import { Material } from './material';
import { Basic } from './material/basic';
import { Grid } from './renderable/grid';
import { Line } from './renderable/line';
import { Point } from './renderable/point';
import { Renderable } from './renderable/Renderable';
import { Renderer } from './Renderer';
import { Scene } from './Scene';
import { TextureCache } from './texture/Cache';
import { Texture2D } from './texture/Texture2D';
import { createCanvas } from './utils/canvas';
import { View } from './View';
export var World = (_dec = injectable(), _dec2 = inject(IDENTIFIER.ConfigService), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function World() {
    _classCallCheck(this, World);

    _initializerDefineProperty(this, "configService", _descriptor, this);

    this.container = void 0;
  }

  _createClass(World, [{
    key: "getEngine",
    value: function () {
      var _getEngine = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var engine, _this$configService$g, canvas, engineOptions;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                engine = this.container.get(IDENTIFIER.RenderEngine);
                _this$configService$g = this.configService.get(), canvas = _this$configService$g.canvas, engineOptions = _this$configService$g.engineOptions;
                _context.next = 4;
                return engine.init(_objectSpread({
                  canvas: canvas || createCanvas(),
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
      var manager = this.container.get(IDENTIFIER.TransformComponentManager);
      return manager.getComponentByEntity(entity);
    }
  }, {
    key: "getMeshComponent",
    value: function getMeshComponent(entity) {
      var manager = this.container.get(IDENTIFIER.MeshComponentManager);
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
      return _createEntity();
    }
  }, {
    key: "createScene",
    value: function createScene() {
      return this.container.get(Scene);
    }
  }, {
    key: "createCamera",
    value: function createCamera() {
      return this.container.get(Camera);
    }
  }, {
    key: "createView",
    value: function createView() {
      return this.container.get(View);
    } // public createLight(type: string,) {
    //   return this.container.getNamed(IDENTIFIER.Light, type)
    // }

  }, {
    key: "createRenderable",
    value: function createRenderable(type, config) {
      var renderable = type ? this.container.getNamed(IDENTIFIER.Renderable, type) : this.container.get(Renderable);

      var entity = _createEntity();

      renderable.setConfig(config || {});
      renderable.setEntity(entity);
      return renderable;
    }
  }, {
    key: "createGeometry",
    value: function createGeometry(type, config) {
      var geometry = this.container.getNamed(IDENTIFIER.Geometry, type);

      var entity = _createEntity();

      geometry.setConfig(config || {});
      geometry.setEntity(entity);
      return geometry.getComponent();
    }
  }, {
    key: "createMaterial",
    value: function createMaterial(type, config) {
      var material = this.container.getNamed(IDENTIFIER.Material, type);

      var entity = _createEntity();

      material.setConfig(config || {});
      material.setEntity(entity, type);
      return material.getComponent();
    }
  }, {
    key: "createTexture2D",
    value: function createTexture2D(config) {
      var texture = this.container.get(Texture2D);
      texture.setConfig(config);
      return texture;
    }
  }, {
    key: "createBufferGeometry",
    value: function createBufferGeometry(params) {
      var geometrySystem = this.container.getNamed(IDENTIFIER.Systems, IDENTIFIER.GeometrySystem);
      return geometrySystem.createBufferGeometry(params);
    }
  }, {
    key: "createInstancedBufferGeometry",
    value: function createInstancedBufferGeometry(params) {
      var geometrySystem = this.container.getNamed(IDENTIFIER.Systems, IDENTIFIER.GeometrySystem);
      return geometrySystem.createInstancedBufferGeometry(params);
    }
  }, {
    key: "createShaderMaterial",
    value: function createShaderMaterial(params) {
      var materialSystem = this.container.getNamed(IDENTIFIER.Systems, IDENTIFIER.MaterialSystem);
      return materialSystem.createShaderMaterial(params);
    }
  }, {
    key: "createKernel",
    value: function createKernel(precompiledBundle) {
      var kernel = this.container.get(Kernel);

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
      var renderer = this.container.get(Renderer);
      renderer.container = this.container;
      renderer.init();
      return renderer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var systems = this.container.getAll(IDENTIFIER.Systems);
      systems.forEach(function (system) {
        if (system.tearDown) {
          system.tearDown();
        }
      });
      var engine = this.container.get(IDENTIFIER.RenderEngine);
      engine.destroy();
      var interactor = this.container.get(IDENTIFIER.InteractorService);
      interactor.destroy();
    }
  }], [{
    key: "create",
    value: function create() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var worldContainer = createWorldContainer(); // bind render engine, fallback to WebGL

      var engineClazz = !navigator.gpu ? WebGLEngine : WebGPUEngine;

      if (!worldContainer.isBound(IDENTIFIER.RenderEngine)) {
        worldContainer.bind(IDENTIFIER.RenderEngine) // @ts-ignore
        .to(engineClazz).inSingletonScope();
      }

      worldContainer.bind(Renderer).toSelf();
      worldContainer.bind(Kernel).toSelf();
      worldContainer.bind(Renderable).toSelf();
      worldContainer.bind(View).toSelf();
      worldContainer.bind(Camera).toSelf();
      worldContainer.bind(Scene).toSelf();
      worldContainer.bind(World).toSelf();
      worldContainer.bind(TextureCache).toSelf();
      worldContainer.bind(Texture2D).toSelf(); // bind geometries

      worldContainer.bind(IDENTIFIER.Geometry).to(Box).whenTargetNamed(Geometry.BOX);
      worldContainer.bind(IDENTIFIER.Geometry).to(Sphere).whenTargetNamed(Geometry.SPHERE);
      worldContainer.bind(IDENTIFIER.Geometry).to(Plane).whenTargetNamed(Geometry.PLANE);
      worldContainer.bind(IDENTIFIER.Geometry).to(Merged).whenTargetNamed(Geometry.MERGED); // bind materials

      worldContainer.bind(IDENTIFIER.Material).to(Basic).whenTargetNamed(Material.BASIC); // bind renderables

      worldContainer.bind(IDENTIFIER.Renderable).to(Point).whenTargetNamed(Renderable.POINT);
      worldContainer.bind(IDENTIFIER.Renderable).to(Line).whenTargetNamed(Renderable.LINE);
      worldContainer.bind(IDENTIFIER.Renderable).to(Grid).whenTargetNamed(Renderable.GRID);
      var world = worldContainer.get(World);
      world.setContainer(worldContainer);
      world.setConfig(config);
      return world;
    }
  }]);

  return World;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "configService", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
//# sourceMappingURL=World.js.map