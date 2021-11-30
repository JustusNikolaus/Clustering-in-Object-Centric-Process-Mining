import { Entity } from '../..';
import { Component } from '../../ComponentManager';
import { NonFunctionProperties } from '../../ComponentManager';
import { IModelInitializationOptions } from '../renderer/IModel';
import { BufferData } from '../renderer/IRendererService';
import { IUniformBinding } from './interface';
export declare class MaterialComponent extends Component<MaterialComponent> {
    vertexShaderGLSL: string;
    fragmentShaderGLSL: string;
    defines: Record<string, boolean | number>;
    dirty: boolean;
    uniforms: IUniformBinding[];
    cull: IModelInitializationOptions['cull'];
    depth: IModelInitializationOptions['depth'];
    blend: IModelInitializationOptions['blend'];
    entity: Entity;
    type: string;
    constructor(data: Partial<NonFunctionProperties<MaterialComponent>>);
    setDefines(defines: Record<string, boolean | number>): this;
    setCull(cull: IModelInitializationOptions['cull']): this;
    setDepth(depth: IModelInitializationOptions['depth']): this;
    setBlend(blend: IModelInitializationOptions['blend']): this;
    setUniform(name: string | Record<string, BufferData>, data?: BufferData): this;
}
