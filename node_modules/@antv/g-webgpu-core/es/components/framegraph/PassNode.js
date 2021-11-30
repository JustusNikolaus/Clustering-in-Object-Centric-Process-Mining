import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
export var PassNode = /*#__PURE__*/function () {
  function PassNode() {
    _classCallCheck(this, PassNode);

    this.name = void 0;
    this.refCount = 0;
    this.hasSideEffect = false;
    this.devirtualize = [];
    this.destroy = [];
    this.reads = [];
    this.writes = [];
  }

  _createClass(PassNode, [{
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
//# sourceMappingURL=PassNode.js.map