import { Component } from '../../ComponentManager';
import { NonFunctionProperties } from '../../ComponentManager';
/**
 * @see https://doc.babylonjs.com/how_to/optimizing_your_scene#changing-mesh-culling-strategy
 */
export declare enum Strategy {
    Standard = 0
}
export declare class CullableComponent extends Component<CullableComponent> {
    strategy: Strategy;
    visibilityPlaneMask: number;
    visible: boolean;
    constructor(data: Partial<NonFunctionProperties<CullableComponent>>);
}
