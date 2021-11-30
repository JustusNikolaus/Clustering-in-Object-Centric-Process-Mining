import { Matrix, Model, IndexMap, Edge } from '../layout/types';
export declare const getEdgeTerminal: (edge: Edge, type: 'source' | 'target') => any;
export declare const getDegree: (n: number, nodeIdxMap: IndexMap, edges: Edge[] | null) => number[];
export declare const floydWarshall: (adjMatrix: Matrix[]) => Matrix[];
export declare const getAdjMatrix: (data: Model, directed: boolean) => Matrix[];
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
export declare const scaleMatrix: (matrix: Matrix[], ratio: number) => Matrix[];
/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */
export declare const traverseTreeUp: <T extends {
    children?: T[] | undefined;
}>(data: T, fn: (param: T) => boolean) => void;
