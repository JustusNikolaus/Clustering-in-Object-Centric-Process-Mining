import { ISystem, IView } from '../..';
import { FrameGraphHandle, TextureDescriptor } from './FrameGraphHandle';
import { FrameGraphPass } from './FrameGraphPass';
import { PassNode } from './PassNode';
import { ResourceEntry } from './ResourceEntry';
import { ResourceNode } from './ResourceNode';
/**
 * ported from FrameGraph implemented by SakuraRender
 * @see https://zhuanlan.zhihu.com/p/98572442
 * @see https://github.com/SaeruHikari/Sakura/blob/RenderGraph/SakuraCore/Source/Framework/GraphicTypes/FrameGraph/SakuraFrameGraph.cpp
 */
export declare class FrameGraphSystem implements ISystem {
    passNodes: PassNode[];
    resourceNodes: ResourceNode[];
    frameGraphPasses: Array<FrameGraphPass<any>>;
    private readonly engine;
    execute(views: IView[]): Promise<void>;
    tearDown(): void;
    addPass<PassData>(name: string, setup: (fg: FrameGraphSystem, passNode: PassNode, pass: FrameGraphPass<PassData>) => void, execute: (fg: FrameGraphSystem, pass: FrameGraphPass<PassData>, views: IView[]) => Promise<void>, tearDown?: () => void): FrameGraphPass<PassData>;
    getPass<T>(name: string): FrameGraphPass<T> | undefined;
    compile(): void;
    executePassNodes(views: IView[]): Promise<void>;
    reset(): void;
    getResourceNode(r: FrameGraphHandle): ResourceNode;
    createResourceNode(resourceEntry: ResourceEntry): FrameGraphHandle;
    createTexture(passNode: PassNode, name: string, descriptor: TextureDescriptor): FrameGraphHandle;
    createRenderTarget(passNode: PassNode, name: string, descriptor: TextureDescriptor): FrameGraphHandle;
    present(input: FrameGraphHandle): void;
}
