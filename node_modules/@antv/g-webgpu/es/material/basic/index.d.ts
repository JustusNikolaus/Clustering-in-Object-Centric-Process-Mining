import { Material } from '..';
import { Texture2D } from '../../texture/Texture2D';
export interface IBasicMaterialParams {
    map: Texture2D;
}
export declare class Basic extends Material<Partial<IBasicMaterialParams>> {
    private readonly engine;
    private readonly shaderModuleService;
    protected onEntityCreated(): void;
}
