import { FrameGraphHandle } from '../../framegraph/FrameGraphHandle';
import { FrameGraphPass } from '../../framegraph/FrameGraphPass';
import { PassNode } from '../../framegraph/PassNode';
import { FrameGraphSystem } from '../../framegraph/System';
import { IRenderPass } from './IRenderPass';
export interface CopyPassData {
    input: FrameGraphHandle;
    output: FrameGraphHandle;
}
export declare class CopyPass implements IRenderPass<CopyPassData> {
    static IDENTIFIER: string;
    private readonly engine;
    private readonly resourcePool;
    private model;
    setup: (fg: FrameGraphSystem, passNode: PassNode, pass: FrameGraphPass<CopyPassData>) => void;
    execute: (fg: FrameGraphSystem, pass: FrameGraphPass<CopyPassData>) => Promise<void>;
    tearDown: () => void;
}
