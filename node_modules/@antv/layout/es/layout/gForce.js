/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { Base } from "./base";
import { isNumber, isFunction, isArray, getDegree, isObject, getEdgeTerminal } from "../util";
const proccessToFunc = (value, defaultV) => {
    let func;
    if (!value) {
        func = (d) => {
            return defaultV || 1;
        };
    }
    else if (isNumber(value)) {
        func = (d) => {
            return value;
        };
    }
    else {
        func = value;
    }
    return func;
};
/**
 * graphin 中的 force 布局
 */
export class GForceLayout extends Base {
    constructor(options) {
        super();
        /** 停止迭代的最大迭代数 */
        this.maxIteration = 1000;
        /** 是否启动 worker */
        this.workerEnabled = false;
        /** 弹簧引力系数 */
        this.edgeStrength = 200;
        /** 斥力系数 */
        this.nodeStrength = 1000;
        /** 库伦系数 */
        this.coulombDisScale = 0.005;
        /** 阻尼系数 */
        this.damping = 0.9;
        /** 最大速度 */
        this.maxSpeed = 1000;
        /** 一次迭代的平均移动距离小于该值时停止迭代 */
        this.minMovement = 0.5;
        /** 迭代中衰减 */
        this.interval = 0.02;
        /** 斥力的一个系数 */
        this.factor = 1;
        /** 理想边长 */
        this.linkDistance = 1;
        /** 重力大小 */
        this.gravity = 10;
        /** 是否防止重叠 */
        this.preventOverlap = true;
        /** 每次迭代结束的回调函数 */
        this.tick = () => { };
        this.nodes = [];
        this.edges = [];
        this.width = 300;
        this.height = 300;
        this.nodeMap = {};
        this.nodeIdxMap = {};
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            maxIteration: 500,
            gravity: 10,
            enableTick: true
        };
    }
    /**
     * 执行布局
     */
    execute() {
        var _a, _b;
        const self = this;
        const nodes = self.nodes;
        if (self.timeInterval !== undefined && typeof window !== "undefined") {
            window.clearInterval(self.timeInterval);
        }
        if (!nodes || nodes.length === 0) {
            (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
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
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            (_b = self.onLayoutEnd) === null || _b === void 0 ? void 0 : _b.call(self);
            return;
        }
        const nodeMap = {};
        const nodeIdxMap = {};
        nodes.forEach((node, i) => {
            if (!isNumber(node.x))
                node.x = Math.random() * self.width;
            if (!isNumber(node.y))
                node.y = Math.random() * self.height;
            nodeMap[node.id] = node;
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.linkDistance = proccessToFunc(self.linkDistance, 1);
        self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
        self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
        // node size function
        const nodeSize = self.nodeSize;
        let nodeSizeFunc;
        if (self.preventOverlap) {
            const nodeSpacing = self.nodeSpacing;
            let nodeSpacingFunc;
            if (isNumber(nodeSpacing)) {
                nodeSpacingFunc = () => nodeSpacing;
            }
            else if (isFunction(nodeSpacing)) {
                nodeSpacingFunc = nodeSpacing;
            }
            else {
                nodeSpacingFunc = () => 0;
            }
            if (!nodeSize) {
                nodeSizeFunc = (d) => {
                    if (d.size) {
                        if (isArray(d.size)) {
                            const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
                            return res + nodeSpacingFunc(d);
                        }
                        if (isObject(d.size)) {
                            const res = d.size.width > d.size.height ? d.size.width : d.size.height;
                            return res + nodeSpacingFunc(d);
                        }
                        return d.size + nodeSpacingFunc(d);
                    }
                    return 10 + nodeSpacingFunc(d);
                };
            }
            else if (isArray(nodeSize)) {
                nodeSizeFunc = (d) => {
                    const res = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
                    return res + nodeSpacingFunc(d);
                };
            }
            else {
                nodeSizeFunc = (d) => nodeSize + nodeSpacingFunc(d);
            }
        }
        self.nodeSize = nodeSizeFunc;
        const edges = self.edges;
        self.degrees = getDegree(nodes.length, self.nodeIdxMap, edges);
        if (!self.getMass) {
            self.getMass = (d) => {
                const mass = self.degrees[self.nodeIdxMap[d.id]] || 1;
                return mass;
            };
        }
        // layout
        self.run();
    }
    run() {
        var _a;
        const self = this;
        const { maxIteration, nodes, workerEnabled, minMovement } = self;
        if (!nodes)
            return;
        if (workerEnabled) {
            for (let i = 0; i < maxIteration; i++) {
                const previousPos = self.runOneStep(i);
                if (self.reachMoveThreshold(nodes, previousPos, minMovement)) {
                    break;
                }
            }
            (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
        }
        else {
            if (typeof window === "undefined")
                return;
            let iter = 0;
            // interval for render the result after each iteration
            this.timeInterval = window.setInterval(() => {
                var _a, _b;
                if (!nodes)
                    return;
                const previousPos = self.runOneStep(iter) || [];
                if (self.reachMoveThreshold(nodes, previousPos, minMovement)) {
                    (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
                    window.clearInterval(self.timeInterval);
                }
                iter++;
                if (iter >= maxIteration) {
                    (_b = self.onLayoutEnd) === null || _b === void 0 ? void 0 : _b.call(self);
                    window.clearInterval(self.timeInterval);
                }
            }, 0);
        }
    }
    reachMoveThreshold(nodes, previousPos, minMovement) {
        // whether to stop the iteration
        let movement = 0;
        nodes.forEach((node, j) => {
            const vx = node.x - previousPos[j].x;
            const vy = node.y - previousPos[j].y;
            movement += Math.sqrt(vx * vx + vy * vy);
        });
        movement /= nodes.length;
        return movement < minMovement;
    }
    runOneStep(iter) {
        var _a;
        const self = this;
        const { nodes, edges } = self;
        const accArray = [];
        const velArray = [];
        if (!nodes)
            return;
        nodes.forEach((_, i) => {
            accArray[2 * i] = 0;
            accArray[2 * i + 1] = 0;
            velArray[2 * i] = 0;
            velArray[2 * i + 1] = 0;
        });
        self.calRepulsive(accArray, nodes);
        if (edges)
            self.calAttractive(accArray, edges);
        self.calGravity(accArray, nodes);
        const stepInterval = Math.max(0.02, self.interval - iter * 0.002);
        self.updateVelocity(accArray, velArray, stepInterval, nodes);
        const previousPos = [];
        nodes.forEach((node) => {
            previousPos.push({
                x: node.x,
                y: node.y
            });
        });
        self.updatePosition(velArray, stepInterval, nodes);
        (_a = self.tick) === null || _a === void 0 ? void 0 : _a.call(self);
        return previousPos;
    }
    calRepulsive(accArray, nodes) {
        const self = this;
        // const nodes = self.nodes;
        const getMass = self.getMass;
        const nodeStrength = self.nodeStrength;
        const factor = self.factor;
        const coulombDisScale = self.coulombDisScale;
        const preventOverlap = self.preventOverlap;
        const nodeSize = self.nodeSize;
        nodes.forEach((ni, i) => {
            const massi = getMass ? getMass(ni) : 1;
            nodes.forEach((nj, j) => {
                if (i >= j)
                    return;
                // if (!accArray[j]) accArray[j] = 0;
                const vecX = ni.x - nj.x;
                const vecY = ni.y - nj.y;
                const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
                const nVecLength = (vecLength + 0.1) * coulombDisScale;
                const direX = vecX / vecLength;
                const direY = vecY / vecLength;
                const param = (((nodeStrength(ni) + nodeStrength(nj)) / 2) * factor) /
                    (nVecLength * nVecLength);
                const massj = getMass ? getMass(nj) : 1;
                accArray[2 * i] += (direX * param);
                accArray[2 * i + 1] += (direY * param);
                accArray[2 * j] -= (direX * param);
                accArray[2 * j + 1] -= (direY * param);
                if (preventOverlap && vecLength < (nodeSize(ni) + nodeSize(nj)) / 2) {
                    const paramOverlap = (nodeStrength(ni) + nodeStrength(nj)) / 2 / (vecLength * vecLength);
                    accArray[2 * i] += (direX * paramOverlap) / massi;
                    accArray[2 * i + 1] += (direY * paramOverlap) / massi;
                    accArray[2 * j] -= (direX * paramOverlap) / massj;
                    accArray[2 * j + 1] -= (direY * paramOverlap) / massj;
                }
            });
        });
    }
    calAttractive(accArray, edges) {
        const self = this;
        // const edges = self.edges;
        const nodeMap = self.nodeMap;
        const nodeIdxMap = self.nodeIdxMap;
        const linkDistance = self.linkDistance;
        const edgeStrength = self.edgeStrength;
        const getMass = self.getMass;
        edges.forEach((edge, i) => {
            const source = getEdgeTerminal(edge, 'source');
            const target = getEdgeTerminal(edge, 'target');
            const sourceNode = nodeMap[source];
            const targetNode = nodeMap[target];
            const vecX = targetNode.x - sourceNode.x;
            const vecY = targetNode.y - sourceNode.y;
            const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
            const direX = vecX / vecLength;
            const direY = vecY / vecLength;
            const length = linkDistance(edge) || 1;
            const diff = length - vecLength;
            const param = diff * edgeStrength(edge);
            const sourceIdx = nodeIdxMap[source];
            const targetIdx = nodeIdxMap[target];
            const massSource = getMass ? getMass(sourceNode) : 1;
            const massTarget = getMass ? getMass(targetNode) : 1;
            accArray[2 * sourceIdx] -= (direX * param) / massSource;
            accArray[2 * sourceIdx + 1] -= (direY * param) / massSource;
            accArray[2 * targetIdx] += (direX * param) / massTarget;
            accArray[2 * targetIdx + 1] += (direY * param) / massTarget;
        });
    }
    calGravity(accArray, nodes) {
        const self = this;
        // const nodes = self.nodes;
        const center = self.center;
        const defaultGravity = self.gravity;
        const degrees = self.degrees;
        const nodeLength = nodes.length;
        for (let i = 0; i < nodeLength; i++) {
            const node = nodes[i];
            let vecX = node.x - center[0];
            let vecY = node.y - center[1];
            let gravity = defaultGravity;
            if (self.getCenter) {
                const customCenterOpt = self.getCenter(node, degrees[i]);
                if (customCenterOpt &&
                    isNumber(customCenterOpt[0]) &&
                    isNumber(customCenterOpt[1]) &&
                    isNumber(customCenterOpt[2])) {
                    vecX = node.x - customCenterOpt[0];
                    vecY = node.y - customCenterOpt[1];
                    gravity = customCenterOpt[2];
                }
            }
            if (!gravity)
                continue;
            accArray[2 * i] -= gravity * vecX;
            accArray[2 * i + 1] -= gravity * vecY;
        }
    }
    updateVelocity(accArray, velArray, stepInterval, nodes) {
        const self = this;
        const param = stepInterval * self.damping;
        // const nodes = self.nodes;
        nodes.forEach((node, i) => {
            let vx = accArray[2 * i] * param || 0.01;
            let vy = accArray[2 * i + 1] * param || 0.01;
            const vLength = Math.sqrt(vx * vx + vy * vy);
            if (vLength > self.maxSpeed) {
                const param2 = self.maxSpeed / vLength;
                vx = param2 * vx;
                vy = param2 * vy;
            }
            velArray[2 * i] = vx;
            velArray[2 * i + 1] = vy;
        });
    }
    updatePosition(velArray, stepInterval, nodes) {
        nodes.forEach((node, i) => {
            if (isNumber(node.fx) && isNumber(node.fy)) {
                node.x = node.fx;
                node.y = node.fy;
                return;
            }
            const distX = velArray[2 * i] * stepInterval;
            const distY = velArray[2 * i + 1] * stepInterval;
            node.x += distX;
            node.y += distY;
        });
    }
    stop() {
        if (this.timeInterval && typeof window !== "undefined") {
            window.clearInterval(this.timeInterval);
        }
    }
    destroy() {
        const self = this;
        self.stop();
        self.tick = null;
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    }
    getType() {
        return "gForce";
    }
}
//# sourceMappingURL=gForce.js.map