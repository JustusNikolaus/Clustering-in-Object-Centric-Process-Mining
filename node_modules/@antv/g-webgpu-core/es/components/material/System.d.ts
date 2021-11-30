import { ISystem } from '../..';
import { IModelInitializationOptions } from '../renderer/IModel';
import { MaterialComponent } from './MaterialComponent';
export declare class MaterialSystem implements ISystem {
    private readonly material;
    private readonly engine;
    private readonly shaderModule;
    execute(): Promise<void>;
    tearDown(): void;
    /**
     * @see https://threejs.org/docs/#api/en/materials/ShaderMaterial
     */
    createShaderMaterial(params: {
        vertexShader: string;
        fragmentShader: string;
        cull?: IModelInitializationOptions['cull'];
        depth?: IModelInitializationOptions['depth'];
        blend?: IModelInitializationOptions['blend'];
    }): import("../..").Component<MaterialComponent> & MaterialComponent;
}
