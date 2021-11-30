import { FrameGraphHandle } from './FrameGraphHandle';
import { FrameGraphSystem } from './System';
import { VirtualResource } from './VirtualResource';
export declare class PassNode {
    name: string;
    /**
     * count resources that have a reference to this pass node
     */
    refCount: number;
    /**
     * set by FG system
     */
    hasSideEffect: boolean;
    /**
     * during FG's compile, create before executing
     */
    devirtualize: VirtualResource[];
    /**
     * during FG's compile, destroy after executing
     */
    destroy: VirtualResource[];
    reads: FrameGraphHandle[];
    writes: FrameGraphHandle[];
    read(handle: FrameGraphHandle): FrameGraphHandle;
    sample(handle: FrameGraphHandle): FrameGraphHandle;
    write(fg: FrameGraphSystem, handle: FrameGraphHandle): FrameGraphHandle;
}
