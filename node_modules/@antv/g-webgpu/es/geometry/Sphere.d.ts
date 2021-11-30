import { Geometry } from '.';
export interface ISphereGeometryParams {
    radius: number;
    latitudeBands: number;
    longitudeBands: number;
}
export declare class Sphere extends Geometry<Partial<ISphereGeometryParams>> {
    protected onEntityCreated(): void;
}
