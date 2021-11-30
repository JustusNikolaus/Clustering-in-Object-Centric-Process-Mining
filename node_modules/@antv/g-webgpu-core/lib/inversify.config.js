"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorldContainer = createWorldContainer;
exports.lazyMultiInject = exports.lazyInject = exports.container = void 0;

require("reflect-metadata");

var _inversify = require("inversify");

var _inversifyInjectDecorators = _interopRequireDefault(require("inversify-inject-decorators"));

var _ComponentManager = require("./ComponentManager");

var _ResourcePool = require("./components/framegraph/ResourcePool");

var _System = require("./components/framegraph/System");

var _GeometryComponent = require("./components/geometry/GeometryComponent");

var _System2 = require("./components/geometry/System");

var _MaterialComponent = require("./components/material/MaterialComponent");

var _System3 = require("./components/material/System");

var _CullableComponent = require("./components/mesh/CullableComponent");

var _MeshComponent = require("./components/mesh/MeshComponent");

var _System4 = require("./components/mesh/System");

var _CopyPass = require("./components/renderer/passes/CopyPass");

var _PixelPickingPass = require("./components/renderer/passes/PixelPickingPass");

var _RenderPass = require("./components/renderer/passes/RenderPass");

var _System5 = require("./components/renderer/System");

var _HierarchyComponent = require("./components/scenegraph/HierarchyComponent");

var _NameComponent = require("./components/scenegraph/NameComponent");

var _System6 = require("./components/scenegraph/System");

var _TransformComponent = require("./components/scenegraph/TransformComponent");

var _identifier = require("./identifier");

var _ConfigService = require("./services/config/ConfigService");

var _IteractorService = require("./services/interactor/IteractorService");

var _ShaderModuleService = _interopRequireDefault(require("./services/shader-module/ShaderModuleService"));

/**
 * Root Container
 * @see /dev-docs/IoC 容器、依赖注入与服务说明.md
 */
// import { InteractionSystem } from './components/interaction/System';
// @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#defaultscope
var container = new _inversify.Container(); // @see https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md#what-can-i-do-when-my-base-class-is-provided-by-a-third-party-module
// decorate(injectable(), EventEmitter);
// container.bind(IDENTIFIER.IEventEmitter).to(EventEmitter);
// 支持使用 new 而非容器实例化的场景，同时禁止 lazyInject cache
// @see https://github.com/inversify/inversify-inject-decorators#caching-vs-non-caching-behaviour

exports.container = container;
var DECORATORS = (0, _inversifyInjectDecorators.default)(container, false);

// Add babel legacy decorators support
// @see https://github.com/inversify/InversifyJS/issues/1050
// @see https://github.com/inversify/InversifyJS/issues/1026#issuecomment-504936034
var lazyInject = function lazyInject(serviceIdentifier) {
  var original = DECORATORS.lazyInject(serviceIdentifier); // the 'descriptor' parameter is actually always defined for class fields for Babel, but is considered undefined for TSC
  // so we just hack it with ?/! combination to avoid "TS1240: Unable to resolve signature of property decorator when called as an expression"

  return function (proto, key, descriptor) {
    // make it work as usual
    original.call(this, proto, key); // return link to proto, so own value wont be 'undefined' after component's creation

    if (descriptor) {
      descriptor.initializer = function () {
        return proto[key];
      };
    }
  };
};

exports.lazyInject = lazyInject;

var lazyMultiInject = function lazyMultiInject(serviceIdentifier) {
  var original = DECORATORS.lazyMultiInject(serviceIdentifier); // the 'descriptor' parameter is actually always defined for class fields for Babel, but is considered undefined for TSC
  // so we just hack it with ?/! combination to avoid "TS1240: Unable to resolve signature of property decorator when called as an expression"

  return function (proto, key, descriptor) {
    // make it work as usual
    original.call(this, proto, key);

    if (descriptor) {
      // return link to proto, so own value wont be 'undefined' after component's creation
      descriptor.initializer = function () {
        return proto[key];
      };
    }
  };
};
/** global services */


exports.lazyMultiInject = lazyMultiInject;
container.bind(_identifier.IDENTIFIER.ShaderModuleService).to(_ShaderModuleService.default).inSingletonScope();
/**
 * bind global component managers in root container
 */

container.bind(_identifier.IDENTIFIER.NameComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_NameComponent.NameComponent));
container.bind(_identifier.IDENTIFIER.HierarchyComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_HierarchyComponent.HierarchyComponent));
container.bind(_identifier.IDENTIFIER.TransformComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_TransformComponent.TransformComponent));
container.bind(_identifier.IDENTIFIER.MeshComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_MeshComponent.MeshComponent));
container.bind(_identifier.IDENTIFIER.CullableComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_CullableComponent.CullableComponent));
container.bind(_identifier.IDENTIFIER.GeometryComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_GeometryComponent.GeometryComponent));
container.bind(_identifier.IDENTIFIER.MaterialComponentManager).toConstantValue(new _ComponentManager.ComponentManager(_MaterialComponent.MaterialComponent)); // https://github.com/inversify/InversifyJS/blob/master/wiki/hierarchical_di.md#support-for-hierarchical-di-systems

function createWorldContainer() {
  var worldContainer = new _inversify.Container();
  worldContainer.parent = container;
  /**
   * bind systems
   */

  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System6.SceneGraphSystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.SceneGraphSystem);
  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System.FrameGraphSystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.FrameGraphSystem);
  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System4.MeshSystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.MeshSystem);
  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System2.GeometrySystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.GeometrySystem);
  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System3.MaterialSystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.MaterialSystem);
  worldContainer.bind(_identifier.IDENTIFIER.Systems).to(_System5.RendererSystem).inSingletonScope().whenTargetNamed(_identifier.IDENTIFIER.RendererSystem); // 资源池

  worldContainer.bind(_identifier.IDENTIFIER.ResourcePool).to(_ResourcePool.ResourcePool).inSingletonScope();
  worldContainer.bind(_identifier.IDENTIFIER.ConfigService).to(_ConfigService.ConfigService).inSingletonScope();
  worldContainer.bind(_identifier.IDENTIFIER.InteractorService).to(_IteractorService.InteractorService).inSingletonScope();
  /**
   * bind render passes
   */

  worldContainer.bind(_identifier.IDENTIFIER.RenderPass).to(_RenderPass.RenderPass).inSingletonScope().whenTargetNamed(_RenderPass.RenderPass.IDENTIFIER);
  worldContainer.bind(_identifier.IDENTIFIER.RenderPass).to(_CopyPass.CopyPass).inSingletonScope().whenTargetNamed(_CopyPass.CopyPass.IDENTIFIER);
  worldContainer.bind(_identifier.IDENTIFIER.RenderPass).to(_PixelPickingPass.PixelPickingPass).inSingletonScope().whenTargetNamed(_PixelPickingPass.PixelPickingPass.IDENTIFIER);
  worldContainer.bind(_identifier.IDENTIFIER.RenderPassFactory).toFactory(function (context) {
    return function (name) {
      return context.container.getNamed(_identifier.IDENTIFIER.RenderPass, name);
    };
  });
  return worldContainer;
}
//# sourceMappingURL=inversify.config.js.map