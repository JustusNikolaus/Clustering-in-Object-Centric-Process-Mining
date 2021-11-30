import { FrameGraphHandle } from '../../framegraph/FrameGraphHandle';
import { FrameGraphPass } from '../../framegraph/FrameGraphPass';
import { PassNode } from '../../framegraph/PassNode';
import { FrameGraphSystem } from '../../framegraph/System';
import { IView } from '../IRendererService';
import { IRenderPass } from './IRenderPass';
export interface RenderPassData {
    output: FrameGraphHandle;
}
export declare class RenderPass implements IRenderPass<RenderPassData> {
    static IDENTIFIER: string;
    private readonly mesh;
    private readonly geometry;
    private readonly material;
    private readonly cullable;
    private readonly transform;
    private readonly hierarchy;
    private readonly frameGraphSystem;
    private readonly engine;
    private readonly resourcePool;
    private modelCache;
    setup: (fg: FrameGraphSystem, passNode: PassNode, pass: FrameGraphPass<RenderPassData>) => void;
    execute: (fg: FrameGraphSystem, pass: FrameGraphPass<RenderPassData>, views: IView[]) => Promise<void>;
    renderView(view: IView): void;
    private renderMesh;
    private initMesh;
    private initView;
}
