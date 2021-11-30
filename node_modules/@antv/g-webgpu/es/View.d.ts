import { ICamera, IScene, IView, IViewport } from '@antv/g-webgpu-core';
export declare class View implements IView {
    private readonly rendererSystem;
    private camera;
    private scene;
    private viewport;
    private clearColor;
    getCamera(): ICamera;
    getScene(): IScene;
    getViewport(): IViewport;
    getClearColor(): [number, number, number, number];
    setCamera(camera: ICamera): this;
    setScene(scene: IScene): this;
    setViewport(viewport: IViewport): this;
    setClearColor(clearColor: [number, number, number, number]): this;
    pick(position: {
        x: number;
        y: number;
    }): number | undefined;
}
