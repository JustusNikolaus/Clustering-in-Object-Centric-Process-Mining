import { BufferData } from '@antv/g-webgpu-core';
import { Renderable } from '../Renderable';
interface IGridConfig {
    gridColor: number[];
    gridSize: number;
}
export declare class Grid extends Renderable<Partial<IGridConfig>> {
    private readonly materialSystem;
    private readonly geometrySystem;
    private readonly shaderModuleService;
    protected onAttributeChanged({ name, data, }: {
        name: string;
        data: BufferData;
    }): void;
    protected onEntityCreated(): void;
}
export {};
