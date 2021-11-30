import { IClearOptions, IView } from '@antv/g-webgpu-core';
import { Container } from 'inversify';
export declare class Renderer {
    container: Container;
    private readonly engine;
    private readonly shaderModule;
    private readonly configService;
    private inited;
    private rendering;
    private pendings;
    private views;
    private size;
    init(): Promise<void>;
    render(...views: IView[]): Promise<void>;
    clear(options: IClearOptions): this;
    setSize({ width, height }: {
        width: number;
        height: number;
    }): this;
    getSize(): {
        width: number;
        height: number;
    };
}
