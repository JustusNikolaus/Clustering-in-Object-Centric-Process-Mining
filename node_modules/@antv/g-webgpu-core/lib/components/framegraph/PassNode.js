"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassNode = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var PassNode = /*#__PURE__*/function () {
  function PassNode() {
    (0, _classCallCheck2.default)(this, PassNode);
    this.name = void 0;
    this.refCount = 0;
    this.hasSideEffect = false;
    this.devirtualize = [];
    this.destroy = [];
    this.reads = [];
    this.writes = [];
  }

  (0, _createClass2.default)(PassNode, [{
    key: "read",
    value: function read(handle) {
      if (!this.reads.find(function (h) {
        return h.index === handle.index;
      })) {
        this.reads.push(handle);
      }

      return handle;
    }
  }, {
    key: "sample",
    value: function sample(handle) {
      this.read(handle); // TODO: 记录在 this.samples 中

      return handle;
    }
  }, {
    key: "write",
    value: function write(fg, handle) {
      var existed = this.writes.find(function (h) {
        return h.index === handle.index;
      });

      if (existed) {
        return handle;
      }

      var node = fg.getResourceNode(handle);
      node.resource.version++;

      if (node.resource.imported) {
        this.hasSideEffect = true;
      }

      var r = fg.createResourceNode(node.resource);
      var newNode = fg.getResourceNode(r);
      newNode.writer = this;
      this.writes.push(r);
      return r;
    }
  }]);
  return PassNode;
}();

exports.PassNode = PassNode;
//# sourceMappingURL=PassNode.js.map