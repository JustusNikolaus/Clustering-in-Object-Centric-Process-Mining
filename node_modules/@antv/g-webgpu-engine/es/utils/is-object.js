import _typeof from "@babel/runtime/helpers/typeof";
export function isObject(value) {
  var type = _typeof(value);

  return value != null && (type === 'object' || type === 'function');
}
//# sourceMappingURL=is-object.js.map