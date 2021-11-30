/**
 * Root Container
 * @see /dev-docs/IoC 容器、依赖注入与服务说明.md
 */
import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { ComponentManager } from './ComponentManager';
import { ResourcePool } from './components/framegraph/ResourcePool';
import { FrameGraphSystem } from './components/framegraph/System';
import { GeometryComponent } from './components/geometry/GeometryComponent';
import { GeometrySystem } from './components/geometry/System'; // import { InteractionSystem } from './components/interaction/System';

import { MaterialComponent } from './components/material/MaterialComponent';
import { MaterialSystem } from './components/material/System';
import { CullableComponent } from './components/mesh/CullableComponent';
import { MeshComponent } from './components/mesh/MeshComponent';
import { MeshSystem } from './components/mesh/System';
import { CopyPass } from './components/renderer/passes/CopyPass';
import { PixelPickingPass } from './components/renderer/passes/PixelPickingPass';
import { RenderPass } from './components/renderer/passes/RenderPass';
import { RendererSystem } from './components/renderer/System';
import { HierarchyComponent } from './components/scenegraph/HierarchyComponent';
import { NameComponent } from './components/scenegraph/NameComponent';
import { SceneGraphSystem } from './components/scenegraph/System';
import { TransformComponent } from './components/scenegraph/TransformComponent';
import { IDENTIFIER } from './identifier';
import { ConfigService } from './services/config/ConfigService';
import { InteractorService } from './services/interactor/IteractorService';
import ShaderModuleService from './services/shader-module/ShaderModuleService'; // @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#defaultscope

export var container = new Container(); // @see https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md#what-can-i-do-when-my-base-class-is-provided-by-a-third-party-module
// decorate(injectable(), EventEmitter);
// container.bind(IDENTIFIER.IEventEmitter).to(EventEmitter);
// 支持使用 new 而非容器实例化的场景，同时禁止 lazyInject cache
// @see https://github.com/inversify/inversify-inject-decorators#caching-vs-non-caching-behaviour

var DECORATORS = getDecorators(container, false);
// Add babel legacy decorators support
// @see https://github.com/inversify/InversifyJS/issues/1050
// @see https://github.com/inversify/InversifyJS/issues/1026#issuecomment-504936034
export var lazyInject = function lazyInject(serviceIdentifier) {
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
export var lazyMultiInject = function lazyMultiInject(serviceIdentifier) {
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

container.bind(IDENTIFIER.ShaderModuleService).to(ShaderModuleService).inSingletonScope();
/**
 * bind global component managers in root container
 */

container.bind(IDENTIFIER.NameComponentManager).toConstantValue(new ComponentManager(NameComponent));
container.bind(IDENTIFIER.HierarchyComponentManager).toConstantValue(new ComponentManager(HierarchyComponent));
container.bind(IDENTIFIER.TransformComponentManager).toConstantValue(new ComponentManager(TransformComponent));
container.bind(IDENTIFIER.MeshComponentManager).toConstantValue(new ComponentManager(MeshComponent));
container.bind(IDENTIFIER.CullableComponentManager).toConstantValue(new ComponentManager(CullableComponent));
container.bind(IDENTIFIER.GeometryComponentManager).toConstantValue(new ComponentManager(GeometryComponent));
container.bind(IDENTIFIER.MaterialComponentManager).toConstantValue(new ComponentManager(MaterialComponent)); // https://github.com/inversify/InversifyJS/blob/master/wiki/hierarchical_di.md#support-for-hierarchical-di-systems

export function createWorldContainer() {
  var worldContainer = new Container();
  worldContainer.parent = container;
  /**
   * bind systems
   */

  worldContainer.bind(IDENTIFIER.Systems).to(SceneGraphSystem).inSingletonScope().whenTargetNamed(IDENTIFIER.SceneGraphSystem);
  worldContainer.bind(IDENTIFIER.Systems).to(FrameGraphSystem).inSingletonScope().whenTargetNamed(IDENTIFIER.FrameGraphSystem);
  worldContainer.bind(IDENTIFIER.Systems).to(MeshSystem).inSingletonScope().whenTargetNamed(IDENTIFIER.MeshSystem);
  worldContainer.bind(IDENTIFIER.Systems).to(GeometrySystem).inSingletonScope().whenTargetNamed(IDENTIFIER.GeometrySystem);
  worldContainer.bind(IDENTIFIER.Systems).to(MaterialSystem).inSingletonScope().whenTargetNamed(IDENTIFIER.MaterialSystem);
  worldContainer.bind(IDENTIFIER.Systems).to(RendererSystem).inSingletonScope().whenTargetNamed(IDENTIFIER.RendererSystem); // 资源池

  worldContainer.bind(IDENTIFIER.ResourcePool).to(ResourcePool).inSingletonScope();
  worldContainer.bind(IDENTIFIER.ConfigService).to(ConfigService).inSingletonScope();
  worldContainer.bind(IDENTIFIER.InteractorService).to(InteractorService).inSingletonScope();
  /**
   * bind render passes
   */

  worldContainer.bind(IDENTIFIER.RenderPass).to(RenderPass).inSingletonScope().whenTargetNamed(RenderPass.IDENTIFIER);
  worldContainer.bind(IDENTIFIER.RenderPass).to(CopyPass).inSingletonScope().whenTargetNamed(CopyPass.IDENTIFIER);
  worldContainer.bind(IDENTIFIER.RenderPass).to(PixelPickingPass).inSingletonScope().whenTargetNamed(PixelPickingPass.IDENTIFIER);
  worldContainer.bind(IDENTIFIER.RenderPassFactory).toFactory(function (context) {
    return function (name) {
      return context.container.getNamed(IDENTIFIER.RenderPass, name);
    };
  });
  return worldContainer;
}
//# sourceMappingURL=inversify.config.js.map