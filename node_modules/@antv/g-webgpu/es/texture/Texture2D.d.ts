import { ITexture2D, ITexture2DInitializationOptions } from '@antv/g-webgpu-core';
export declare class Texture2D {
    private readonly textureCache;
    private readonly engine;
    private config;
    private loaded;
    private texture;
    setConfig(config: ITexture2DInitializationOptions & {
        url: string;
    }): void;
    isLoaded(): boolean;
    load(): Promise<ITexture2D>;
}
