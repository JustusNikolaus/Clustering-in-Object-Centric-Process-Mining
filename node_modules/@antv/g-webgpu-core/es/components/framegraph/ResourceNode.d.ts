import { PassNode } from './PassNode';
import { ResourceEntry } from './ResourceEntry';
export declare class ResourceNode {
    resource: ResourceEntry;
    writer: PassNode;
    readerCount: number;
    version: number;
}
