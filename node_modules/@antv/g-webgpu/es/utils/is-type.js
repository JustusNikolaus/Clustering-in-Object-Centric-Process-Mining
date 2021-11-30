var toString = {}.toString;

var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

export default isType;
//# sourceMappingURL=is-type.js.map