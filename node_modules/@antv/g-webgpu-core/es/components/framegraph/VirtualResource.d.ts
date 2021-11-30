import { IRendererService } from '../renderer/IRendererService';
import { PassNode } from './PassNode';
/**
 * ported from filament
 */
export declare abstract class VirtualResource {
    first: PassNode;
    last: PassNode;
    abstract preExecuteDevirtualize(engine: IRendererService): void;
    abstract preExecuteDestroy(engine: IRendererService): void;
    abstract postExecuteDestroy(engine: IRendererService): void;
    abstract postExecuteDevirtualize(engine: IRendererService): void;
}
