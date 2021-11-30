import { ITexture2D } from '@antv/g-webgpu-core';
export declare class TextureCache {
    private cache;
    get(name: string): ITexture2D;
    set(name: string, texture: ITexture2D): void;
}
