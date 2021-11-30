import { Entity, ISystem } from '../..';
import { ComponentManager } from '../../ComponentManager';
import { HierarchyComponent } from './HierarchyComponent';
import { TransformComponent } from './TransformComponent';
export declare class SceneGraphSystem implements ISystem {
    private readonly hierarchy;
    private readonly transform;
    private readonly mesh;
    execute(): Promise<void>;
    tearDown(): void;
    getHierarchyComponentManager(): ComponentManager<HierarchyComponent>;
    getTransformComponentManager(): ComponentManager<TransformComponent>;
    runTransformUpdateSystem(): void;
    runHierarchyUpdateSystem(): void;
    attach(entity: Entity, parent: Entity, isChildAlreadyInLocalSpace?: boolean): void;
    detach(entity: Entity): void;
    detachChildren(parent: Entity): void;
    private setMeshAABBDirty;
}
