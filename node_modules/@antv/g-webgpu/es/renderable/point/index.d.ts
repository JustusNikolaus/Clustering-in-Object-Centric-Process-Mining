import { BufferData } from '@antv/g-webgpu-core';
import { Renderable } from '../Renderable';
interface IPointConfig {
    id: number;
    shape: 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'octogon' | 'hexagram' | 'rhombus' | 'vesica';
    position: [number, number];
    size: [number, number];
    color: [number, number, number, number];
    opacity: number;
    strokeWidth: number;
    strokeOpacity: number;
    strokeColor: [number, number, number, number];
}
/**
 * Use SDF to draw 2D point with stroke.
 */
export declare class Point extends Renderable<Partial<IPointConfig> | Array<Partial<IPointConfig>>> {
    private readonly materialSystem;
    private readonly geometrySystem;
    private readonly shaderModuleService;
    protected onAttributeChanged({ name, data, }: {
        name: string;
        data: BufferData;
    }): void;
    protected onEntityCreated(): void;
    private buildAttribute;
    private buildAttributes;
}
export {};
