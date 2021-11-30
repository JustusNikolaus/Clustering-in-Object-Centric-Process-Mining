export interface IInteractorService {
    listen(canvas: HTMLCanvasElement): void;
    disconnect(): void;
    connect(): void;
    destroy(): void;
    on(event: IInteractorEvent, args?: unknown): void;
}
export declare enum IInteractorEvent {
    PANSTART = "PANSTART",
    PANEND = "PANEND",
    PANMOVE = "PANMOVE",
    PINCH = "PINCH",
    KEYDOWN = "KEYDOWN",
    KEYUP = "KEYUP",
    HOVER = "HOVER"
}
export declare class InteractorService implements IInteractorService {
    listen(canvas: HTMLCanvasElement): void;
    on(event: IInteractorEvent, args?: unknown): void;
    connect(): void;
    disconnect(): void;
    destroy(): void;
}
