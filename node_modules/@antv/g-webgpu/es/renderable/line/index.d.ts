import { BufferData } from '@antv/g-webgpu-core';
import { Renderable } from '../Renderable';
interface ILineConfig {
    id: number;
    points: number[][];
    thickness: number;
    color: [number, number, number, number];
    dashOffset: number;
    dashArray: number;
    dashRatio: number;
}
export declare class Line extends Renderable<Partial<ILineConfig>> {
    private readonly materialSystem;
    private readonly geometrySystem;
    private readonly shaderModuleService;
    private vertexCount;
    protected onAttributeChanged({ name, data, }: {
        name: string;
        data: BufferData;
    }): void;
    protected onEntityCreated(): void;
}
export {};
