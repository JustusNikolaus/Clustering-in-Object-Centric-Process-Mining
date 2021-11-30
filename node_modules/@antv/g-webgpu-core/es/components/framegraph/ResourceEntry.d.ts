import { IFramebuffer } from '../..';
import { TextureDescriptor } from './FrameGraphHandle';
import { VirtualResource } from './VirtualResource';
export declare class ResourceEntry extends VirtualResource {
    version: number;
    refs: number;
    name: string;
    imported: boolean;
    priority: number;
    discardStart: boolean;
    discardEnd: boolean;
    descriptor: TextureDescriptor;
    resource: IFramebuffer;
    /**
     * Lifecycles in FG's execute
     */
    preExecuteDestroy(): void;
    postExecuteDestroy(): void;
    postExecuteDevirtualize(): void;
    preExecuteDevirtualize(): void;
}
