import { Base } from "../layout/base";
import { isObject } from "../util";
const map = new Map();
export const registerLayout = (name, layoutOverride) => {
    if (map.get(name)) {
        console.warn(`The layout with the name ${name} exists already, it will be overridden`);
    }
    if (isObject(layoutOverride)) {
        // tslint:disable-next-line: max-classes-per-file
        class GLayout extends Base {
            constructor(cfg) {
                super();
                const self = this;
                const props = {};
                const defaultCfg = self.getDefaultCfg();
                Object.assign(props, defaultCfg, layoutOverride, cfg);
                Object.keys(props).forEach((key) => {
                    const value = props[key];
                    self[key] = value;
                });
            }
        }
        map.set(name, GLayout);
    }
    else {
        map.set(name, layoutOverride);
    }
    return map.get(name);
};
export const unRegisterLayout = (name) => {
    if (map.has(name)) {
        map.delete(name);
    }
};
export const getLayoutByName = (name) => {
    if (map.has(name)) {
        return map.get(name);
    }
    return null;
};
//# sourceMappingURL=index.js.map