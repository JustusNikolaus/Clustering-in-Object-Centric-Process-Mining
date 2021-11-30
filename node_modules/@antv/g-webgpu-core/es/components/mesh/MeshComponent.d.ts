import { Entity, MaterialComponent } from '../..';
import { Component } from '../../ComponentManager';
import { NonFunctionProperties } from '../../ComponentManager';
import { AABB } from '../../shape/AABB';
import { GeometryComponent } from '../geometry/GeometryComponent';
import { IModel } from '../renderer/IModel';
export declare class MeshComponent extends Component<MeshComponent> {
    material: MaterialComponent;
    geometry: GeometryComponent;
    /**
     * aabb 应该存在 Mesh 而非 Geometry 中，原因包括：
     * 1. 包围盒会受 transform 影响。例如每次 transform 之后应该重新计算包围盒（center 发生偏移）。
     * 2. 多个 Mesh 可以共享一个 Geometry，但可以各自拥有不同的 aabb
     */
    aabb: AABB;
    /**
     * transform 之后需要重新计算包围盒
     */
    aabbDirty: boolean;
    /**
     * 实际渲染 Model
     */
    model: IModel | undefined;
    visible: boolean;
    children: Entity[];
    constructor(data: Partial<NonFunctionProperties<MeshComponent>>);
}
