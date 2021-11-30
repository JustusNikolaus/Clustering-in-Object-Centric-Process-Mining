import { Base } from "./base";
import { Model, ILayout } from "./types";
export declare class Layout {
    readonly layoutInstance: Base;
    constructor(options: ILayout.LayoutOptions);
    layout(data: Model): Model;
    updateCfg(cfg: ILayout.LayoutOptions): void;
    init(data: Model): void;
    execute(): void;
    getDefaultCfg(): {};
    destroy(): void;
}
export declare const Layouts: {
    [key: string]: any;
};
