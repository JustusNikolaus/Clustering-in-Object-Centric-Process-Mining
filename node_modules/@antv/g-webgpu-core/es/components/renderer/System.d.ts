import { ISystem } from '../..';
import { IView } from './IRendererService';
export declare class RendererSystem implements ISystem {
    private readonly frameGraphSystem;
    private readonly renderPassFactory;
    private readonly configService;
    private readonly resourcePool;
    execute(views: IView[]): Promise<void>;
    tearDown(): void;
    pick(position: {
        x: number;
        y: number;
    }, view: IView): number | undefined;
}
