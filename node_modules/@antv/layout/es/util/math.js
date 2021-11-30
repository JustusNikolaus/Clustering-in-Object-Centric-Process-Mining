import { isObject } from './object';
export const getEdgeTerminal = (edge, type) => {
    const terminal = edge[type];
    if (isObject(terminal)) {
        return terminal.cell;
    }
    return terminal;
};
export const getDegree = (n, nodeIdxMap, edges) => {
    const degrees = [];
    for (let i = 0; i < n; i++) {
        degrees[i] = 0;
    }
    if (!edges)
        return degrees;
    edges.forEach((e) => {
        const source = getEdgeTerminal(e, 'source');
        const target = getEdgeTerminal(e, 'target');
        if (source) {
            degrees[nodeIdxMap[source]] += 1;
        }
        if (target) {
            degrees[nodeIdxMap[target]] += 1;
        }
    });
    return degrees;
};
export const floydWarshall = (adjMatrix) => {
    // initialize
    const dist = [];
    const size = adjMatrix.length;
    for (let i = 0; i < size; i += 1) {
        dist[i] = [];
        for (let j = 0; j < size; j += 1) {
            if (i === j) {
                dist[i][j] = 0;
            }
            else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
                dist[i][j] = Infinity;
            }
            else {
                dist[i][j] = adjMatrix[i][j];
            }
        }
    }
    // floyd
    for (let k = 0; k < size; k += 1) {
        for (let i = 0; i < size; i += 1) {
            for (let j = 0; j < size; j += 1) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
};
export const getAdjMatrix = (data, directed) => {
    const { nodes, edges } = data;
    const matrix = [];
    // map node with index in data.nodes
    const nodeMap = {};
    if (!nodes) {
        throw new Error('invalid nodes data!');
    }
    if (nodes) {
        nodes.forEach((node, i) => {
            nodeMap[node.id] = i;
            const row = [];
            matrix.push(row);
        });
    }
    if (edges) {
        edges.forEach((e) => {
            const source = getEdgeTerminal(e, 'source');
            const target = getEdgeTerminal(e, 'target');
            const sIndex = nodeMap[source];
            const tIndex = nodeMap[target];
            matrix[sIndex][tIndex] = 1;
            if (!directed) {
                matrix[tIndex][sIndex] = 1;
            }
        });
    }
    return matrix;
};
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
export const scaleMatrix = (matrix, ratio) => {
    const result = [];
    matrix.forEach((row) => {
        const newRow = [];
        row.forEach((v) => {
            newRow.push(v * ratio);
        });
        result.push(newRow);
    });
    return result;
};
/**
 * depth first traverse, from leaves to root, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
const traverseUp = (data, fn) => {
    if (data && data.children) {
        for (let i = data.children.length - 1; i >= 0; i--) {
            if (!traverseUp(data.children[i], fn))
                return;
        }
    }
    if (!fn(data)) {
        return false;
    }
    return true;
};
/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */
export const traverseTreeUp = (data, fn) => {
    if (typeof fn !== 'function') {
        return;
    }
    traverseUp(data, fn);
};
//# sourceMappingURL=math.js.map