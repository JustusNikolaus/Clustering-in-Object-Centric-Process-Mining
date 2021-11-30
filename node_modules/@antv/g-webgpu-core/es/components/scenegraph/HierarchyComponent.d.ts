import { Entity } from '../..';
import { Component, NonFunctionProperties } from '../../ComponentManager';
export declare class HierarchyComponent extends Component<HierarchyComponent> {
    parentID: Entity;
    constructor(data: Partial<NonFunctionProperties<HierarchyComponent>>);
}
