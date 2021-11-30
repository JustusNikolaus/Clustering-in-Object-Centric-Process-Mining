import { FrameGraphHandle } from '../../framegraph/FrameGraphHandle';
import { FrameGraphPass } from '../../framegraph/FrameGraphPass';
import { PassNode } from '../../framegraph/PassNode';
import { FrameGraphSystem } from '../../framegraph/System';
import { IView } from '../IRendererService';
import { IRenderPass } from './IRenderPass';
export interface PixelPickingPassData {
    output: FrameGraphHandle;
}
/**
 * color-based picking
 * @see https://threejsfundamentals.org/threejs/lessons/threejs-picking.html
 */
export declare class PixelPickingPass implements IRenderPass<PixelPickingPassData> {
    static IDENTIFIER: string;
    private readonly engine;
    private readonly resourcePool;
    private readonly renderPassFactory;
    private readonly mesh;
    private pickingFBO;
    private views;
    private highlightEnabled;
    private highlightColor;
    /**
     * 简单的 throttle，防止连续触发 hover 时导致频繁渲染到 picking framebuffer
     */
    private alreadyInRendering;
    enableHighlight(enabled: boolean): void;
    setHighlightColor(color: number[]): void;
    setup: (fg: FrameGraphSystem, passNode: PassNode, pass: FrameGraphPass<PixelPickingPassData>) => void;
    execute: (fg: FrameGraphSystem, pass: FrameGraphPass<PixelPickingPassData>, views: IView[]) => Promise<void>;
    pick: ({ x, y }: {
        x: number;
        y: number;
    }, view: IView) => number | undefined;
    /**
     * highlight 如果直接修改选中 feature 的 buffer，存在两个问题：
     * 1. 鼠标移走时无法恢复
     * 2. 无法实现高亮颜色与原始原色的 alpha 混合
     * 因此高亮还是放在 shader 中做比较好
     */
    private highlightPickedFeature;
}
