"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseTreeUp = exports.scaleMatrix = exports.getAdjMatrix = exports.floydWarshall = exports.getDegree = exports.getEdgeTerminal = void 0;
var object_1 = require("./object");
var getEdgeTerminal = function (edge, type) {
    var terminal = edge[type];
    if ((0, object_1.isObject)(terminal)) {
        return terminal.cell;
    }
    return terminal;
};
exports.getEdgeTerminal = getEdgeTerminal;
var getDegree = function (n, nodeIdxMap, edges) {
    var degrees = [];
    for (var i = 0; i < n; i++) {
        degrees[i] = 0;
    }
    if (!edges)
        return degrees;
    edges.forEach(function (e) {
        var source = (0, exports.getEdgeTerminal)(e, 'source');
        var target = (0, exports.getEdgeTerminal)(e, 'target');
        if (source) {
            degrees[nodeIdxMap[source]] += 1;
        }
        if (target) {
            degrees[nodeIdxMap[target]] += 1;
        }
    });
    return degrees;
};
exports.getDegree = getDegree;
var floydWarshall = function (adjMatrix) {
    // initialize
    var dist = [];
    var size = adjMatrix.length;
    for (var i = 0; i < size; i += 1) {
        dist[i] = [];
        for (var j = 0; j < size; j += 1) {
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
    for (var k = 0; k < size; k += 1) {
        for (var i = 0; i < size; i += 1) {
            for (var j = 0; j < size; j += 1) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
};
exports.floydWarshall = floydWarshall;
var getAdjMatrix = function (data, directed) {
    var nodes = data.nodes, edges = data.edges;
    var matrix = [];
    // map node with index in data.nodes
    var nodeMap = {};
    if (!nodes) {
        throw new Error('invalid nodes data!');
    }
    if (nodes) {
        nodes.forEach(function (node, i) {
            nodeMap[node.id] = i;
            var row = [];
            matrix.push(row);
        });
    }
    if (edges) {
        edges.forEach(function (e) {
            var source = (0, exports.getEdgeTerminal)(e, 'source');
            var target = (0, exports.getEdgeTerminal)(e, 'target');
            var sIndex = nodeMap[source];
            var tIndex = nodeMap[target];
            matrix[sIndex][tIndex] = 1;
            if (!directed) {
                matrix[tIndex][sIndex] = 1;
            }
        });
    }
    return matrix;
};
exports.getAdjMatrix = getAdjMatrix;
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
var scaleMatrix = function (matrix, ratio) {
    var result = [];
    matrix.forEach(function (row) {
        var newRow = [];
        row.forEach(function (v) {
            newRow.push(v * ratio);
        });
        result.push(newRow);
    });
    return result;
};
exports.scaleMatrix = scaleMatrix;
/**
 * depth first traverse, from leaves to root, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
var traverseUp = function (data, fn) {
    if (data && data.children) {
        for (var i = data.children.length - 1; i >= 0; i--) {
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
var traverseTreeUp = function (data, fn) {
    if (typeof fn !== 'function') {
        return;
    }
    traverseUp(data, fn);
};
exports.traverseTreeUp = traverseTreeUp;
//# sourceMappingURL=math.js.map