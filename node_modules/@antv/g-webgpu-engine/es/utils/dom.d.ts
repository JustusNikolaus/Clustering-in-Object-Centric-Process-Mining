export declare function isWindowObjectExist(): boolean;
export declare function loadScript(scriptUrl: string, onSuccess: () => void, onError?: (message?: string, exception?: any) => void, scriptId?: string): void;
export declare function loadScriptAsync(scriptUrl: string, scriptId?: string): Promise<void>;
