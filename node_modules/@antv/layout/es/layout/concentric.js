/**
 * @fileOverview concentric layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */
import { isString, isArray, isNumber, getDegree, isObject } from "../util";
import { Base } from "./base";
/**
 * 同心圆布局
 */
export class ConcentricLayout extends Base {
    constructor(options) {
        super();
        this.nodeSize = 30;
        /** min spacing between outside of nodes (used for radius adjustment) */
        this.minNodeSpacing = 10;
        /** prevents node overlap, may overflow boundingBox if not enough space */
        this.preventOverlap = false;
        /** whether levels have an equal radial distance betwen them, may cause bounding box overflow */
        this.equidistant = false;
        /** where nodes start in radians */
        this.startAngle = (3 / 2) * Math.PI;
        /** whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false) */
        this.clockwise = true;
        /** 根据 sortBy 指定的属性进行排布，数值高的放在中心，如果是 sortBy 则会计算节点度数，度数最高的放在中心 */
        this.sortBy = "degree";
        this.nodes = [];
        this.edges = [];
        this.width = 300;
        this.height = 300;
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            nodeSize: 30,
            minNodeSpacing: 10,
            preventOverlap: false,
            sweep: undefined,
            equidistant: false,
            startAngle: (3 / 2) * Math.PI,
            clockwise: true,
            maxLevelDiff: undefined,
            sortBy: "degree"
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        const nodes = self.nodes;
        const edges = self.edges;
        const n = nodes.length;
        if (n === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        if (!self.center) {
            self.center = [self.width / 2, self.height / 2];
        }
        const center = self.center;
        if (n === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        const layoutNodes = [];
        let maxNodeSize;
        if (isArray(self.nodeSize)) {
            maxNodeSize = Math.max(self.nodeSize[0], self.nodeSize[1]);
        }
        else {
            maxNodeSize = self.nodeSize;
        }
        nodes.forEach((node) => {
            layoutNodes.push(node);
            let nodeSize = maxNodeSize;
            if (isArray(node.size)) {
                nodeSize = Math.max(node.size[0], node.size[1]);
            }
            else if (isNumber(node.size)) {
                nodeSize = node.size;
            }
            else if (isObject(node.size)) {
                nodeSize = Math.max(node.size.width, node.size.height);
            }
            maxNodeSize = Math.max(maxNodeSize, nodeSize);
        });
        self.clockwise =
            self.counterclockwise !== undefined
                ? !self.counterclockwise
                : self.clockwise;
        // layout
        const nodeMap = {};
        const indexMap = {};
        layoutNodes.forEach((node, i) => {
            nodeMap[node.id] = node;
            indexMap[node.id] = i;
        });
        // get the node degrees
        if (self.sortBy === "degree" ||
            !isString(self.sortBy) ||
            layoutNodes[0][self.sortBy] === undefined) {
            self.sortBy = "degree";
            if (!isNumber(nodes[0].degree)) {
                const values = getDegree(nodes.length, indexMap, edges);
                layoutNodes.forEach((node, i) => {
                    node.degree = values[i];
                });
            }
        }
        // sort nodes by value
        layoutNodes.sort((n1, n2) => n2[self.sortBy] - n1[self.sortBy]);
        self.maxValueNode = layoutNodes[0];
        self.maxLevelDiff =
            self.maxLevelDiff || self.maxValueNode[self.sortBy] / 4;
        // put the values into levels
        const levels = [[]];
        let currentLevel = levels[0];
        layoutNodes.forEach((node) => {
            if (currentLevel.length > 0) {
                const diff = Math.abs(currentLevel[0][self.sortBy] - node[self.sortBy]);
                if (self.maxLevelDiff && diff >= self.maxLevelDiff) {
                    currentLevel = [];
                    levels.push(currentLevel);
                }
            }
            currentLevel.push(node);
        });
        // create positions for levels
        let minDist = maxNodeSize + self.minNodeSpacing; // min dist between nodes
        if (!self.preventOverlap) {
            // then strictly constrain to bb
            const firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
            const maxR = Math.min(self.width, self.height) / 2 - minDist;
            const rStep = maxR / (levels.length + (firstLvlHasMulti ? 1 : 0));
            minDist = Math.min(minDist, rStep);
        }
        // find the metrics for each level
        let r = 0;
        levels.forEach((level) => {
            let sweep = self.sweep;
            if (sweep === undefined) {
                sweep = 2 * Math.PI - (2 * Math.PI) / level.length;
            }
            const dTheta = (level.dTheta = sweep / Math.max(1, level.length - 1));
            // calculate the radius
            if (level.length > 1 && self.preventOverlap) {
                // but only if more than one node (can't overlap)
                const dcos = Math.cos(dTheta) - Math.cos(0);
                const dsin = Math.sin(dTheta) - Math.sin(0);
                const rMin = Math.sqrt((minDist * minDist) / (dcos * dcos + dsin * dsin)); // s.t. no nodes overlapping
                r = Math.max(rMin, r);
            }
            level.r = r;
            r += minDist;
        });
        if (self.equidistant) {
            let rDeltaMax = 0;
            let rr = 0;
            for (let i = 0; i < levels.length; i++) {
                const level = levels[i];
                const rDelta = level.r - rr;
                rDeltaMax = Math.max(rDeltaMax, rDelta);
            }
            rr = 0;
            levels.forEach((level, i) => {
                if (i === 0) {
                    rr = level.r;
                }
                level.r = rr;
                rr += rDeltaMax;
            });
        }
        // calculate the node positions
        levels.forEach((level) => {
            const dTheta = level.dTheta;
            const rr = level.r;
            level.forEach((node, j) => {
                const theta = self.startAngle + (self.clockwise ? 1 : -1) * dTheta * j;
                node.x = center[0] + rr * Math.cos(theta);
                node.y = center[1] + rr * Math.sin(theta);
            });
        });
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes,
            edges
        };
    }
    getType() {
        return "concentric";
    }
}
//# sourceMappingURL=concentric.js.map