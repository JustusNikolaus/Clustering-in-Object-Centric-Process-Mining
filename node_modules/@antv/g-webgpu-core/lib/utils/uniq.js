"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniq = uniq;

function uniq(array) {
  return array.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}
//# sourceMappingURL=uniq.js.map