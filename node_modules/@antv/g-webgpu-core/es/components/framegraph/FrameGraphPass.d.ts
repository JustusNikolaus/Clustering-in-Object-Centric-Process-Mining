import { IView } from '../..';
import { FrameGraphSystem } from './System';
export declare class FrameGraphPass<PassData> {
    name: string;
    data: PassData;
    execute: (fg: FrameGraphSystem, pass: FrameGraphPass<PassData>, views: IView[]) => Promise<void>;
    tearDown: () => void;
}
