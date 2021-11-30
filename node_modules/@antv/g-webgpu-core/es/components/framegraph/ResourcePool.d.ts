import { IFramebuffer } from '../..';
import { ResourceEntry } from './ResourceEntry';
export declare class ResourcePool {
    private readonly engine;
    private resourcePool;
    /**
     * 负责实例化虚拟资源，通过引擎服务
     * @param resource 虚拟资源
     */
    getOrCreateResource(resource: ResourceEntry): IFramebuffer;
    clean(): void;
}
