"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePickingColor = encodePickingColor;

function encodePickingColor(featureIdx) {
  return [featureIdx + 1 & 255, featureIdx + 1 >> 8 & 255, featureIdx + 1 >> 8 >> 8 & 255];
}
//# sourceMappingURL=picking.js.map