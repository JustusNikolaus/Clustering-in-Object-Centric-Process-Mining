import { IScene } from '@antv/g-webgpu-core';
import { Renderable } from '.';
export declare class Scene implements IScene {
    private entities;
    getEntities(): number[];
    addRenderable(renderable: Renderable): this;
    removeRenderable(renderable: Renderable): this;
    addLight(): void;
    private addEntity;
    private removeEntity;
}
