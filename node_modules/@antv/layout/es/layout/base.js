export class Base {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.combos = [];
        this.positions = [];
        this.destroyed = false;
        this.onLayoutEnd = () => { };
    }
    layout(data) {
        this.init(data);
        return this.execute(true);
    }
    init(data) {
        this.nodes = data.nodes || [];
        this.edges = data.edges || [];
        this.combos = data.combos || [];
    }
    execute(reloadData) { }
    executeWithWorker() { }
    getDefaultCfg() {
        return {};
    }
    updateCfg(cfg) {
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    getType() {
        return 'base';
    }
    destroy() {
        this.nodes = null;
        this.edges = null;
        this.combos = null;
        this.positions = null;
        this.destroyed = true;
    }
}
//# sourceMappingURL=base.js.map