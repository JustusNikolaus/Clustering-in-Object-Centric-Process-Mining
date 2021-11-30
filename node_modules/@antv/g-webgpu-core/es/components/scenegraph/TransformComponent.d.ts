import { mat4, quat, vec3 } from 'gl-matrix';
import { Component, NonFunctionProperties } from '../../ComponentManager';
export declare class TransformComponent extends Component<TransformComponent> {
    static DIRTY: number;
    dirtyFlag: number;
    localDirtyFlag: number;
    parent: TransformComponent | null;
    /**
     * local space RTS
     */
    /**
     * XMFLOAT4X4._41
     * @see https://docs.microsoft.com/en-us/windows/win32/api/directxmath/nf-directxmath-xmfloat4x4-xmfloat4x4(constfloat)#remarks
     */
    localPosition: vec3;
    localRotation: import("gl-matrix").mat2;
    localScale: vec3;
    localTransform: mat4;
    /**
     * world space RTS
     */
    position: vec3;
    rotation: import("gl-matrix").mat2;
    scaling: vec3;
    worldTransform: mat4;
    matrixTransform: (mat: mat4) => void;
    /**
     * @see https://docs.microsoft.com/en-us/windows/win32/api/directxmath/nf-directxmath-xmquaternionrotationrollpitchyaw
     */
    rotateRollPitchYaw: (x: number, y: number, z: number) => void;
    /**
     * @see https://xiaoiver.github.io/coding/2018/12/28/Camera-%E8%AE%BE%E8%AE%A1-%E4%B8%80.html
     */
    lerp: (a: TransformComponent, b: TransformComponent, t: number) => void;
    /**
     * TODO: 支持以下两种：
     * * translate(x, y, z)
     * * translate(vec3(x, y, z))
     */
    translate: (translation: vec3) => this;
    translateLocal: (translation: vec3) => this;
    setPosition: (position: vec3) => this;
    rotate: (quaternion: quat) => this;
    rotateLocal: (quaternion: quat) => this;
    setRotation: (rotation: quat) => this;
    /**
     * @see https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline
     */
    constructor(data?: Partial<NonFunctionProperties<TransformComponent>>);
    setLocalPosition(position: vec3): void;
    setLocalScale(scale: vec3): void;
    setLocalRotation(rotation: quat): this;
    isDirty(): number;
    setDirty(value?: boolean): void;
    isLocalDirty(): number;
    setLocalDirty(value?: boolean): void;
    updateTransform(): void;
    updateTransformWithParent(parent: TransformComponent): void;
    applyTransform(): void;
    clearTransform(): void;
    scaleLocal(scaling: vec3): this;
    getLocalPosition(): vec3;
    getLocalRotation(): import("gl-matrix").mat2;
    getLocalScale(): vec3;
    getLocalTransform(): mat4;
    getWorldTransform(): mat4;
    getPosition(): vec3;
    getRotation(): import("gl-matrix").mat2;
    getScale(): vec3;
}
